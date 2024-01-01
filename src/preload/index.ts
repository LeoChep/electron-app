import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import fs from 'fs'

// Custom APIs for renderer
const getDev = () => {
  return process.platform
}
const getIsDev = () => {
  return ipcRenderer.sendSync('getDev');
}

const readFolder = (dir: string) => {
  
   return new Promise((resolve)=>{
      fs.readdir(dir, (err, files) => {
        const result = [] as string[]
        if (err) {
          throw err
        }
    
        // files object contains all files names
        // log them on console
        files.forEach((file) => {
          result.push(file)
          console.log(file)
        })
        resolve(result)
      })
    })

  
}

const api = { getDev, readFolder ,getIsDev}

// console.log("is",is)
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
