const runDev = {} as any
export function getAssetFiles(folder?: string) {
  if (!folder) folder = ''
  console.log('rundev', runDev)
  try {
    const isDev = (window?.api as any)?.getIsDev()
    console.log('isDev', isDev)
    let resourcesPath = ''
    if (isDev) {
      resourcesPath = './src/renderer/public/asset/' + folder
    } else {
      resourcesPath = './resources/asset/' + folder
    }
    const files = (window?.api as any)?.readFolder(resourcesPath)
    
    files.then((res) => {
      console.log(res)
      return res;
    })
    return files;
    // return files;
  } catch (e) {}
  //在非electron环境
  let files
  if (folder == '') files = import.meta.glob('../../public/asset/' + '*.*')
  if (folder == 'monster') files = import.meta.glob('../../public/asset/monster/' + '*.*')
  return files
}
export { runDev }
