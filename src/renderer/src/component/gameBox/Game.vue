<template>
    {{ getMousePosition }}
    <div @drop="dropOn" ondragover="event.preventDefault()">
        <v-stage :config="configKonva" ref="stage">
            <v-layer draggable="true" ref="layer" @mouseMove="mouseMoveHandle">
                <v-group>
                    <v-text :text="'111'" :x="200" :y="200"></v-text>
                    <v-image :config="background"></v-image>
                    <VToken v-for="actor in state.actorStates" :actor="actor"></VToken>
                </v-group>
            </v-layer>
        </v-stage>
    </div>
</template>

<script setup >
import { useScenesStore } from '@/stores/sceneStore';
import { useMouseControllerStore } from '@/stores/contoller/mouseControllerStore.ts';

import { useDirector } from "@/stores/perform/director"
import VToken from "./tokenComponent/VToken.vue"
import { getAssetFiles } from "../../tools/indexGetter.ts"
import { computed, onMounted, ref, watch } from 'vue';
const mouseConrollerStore = useMouseControllerStore();
const mouseMoveHandle = (event) => {
    console.log(event)
    const layerX = layer.value.getNode().getX()
    const layerY = layer.value.getNode().getY()
    const pos = { x: event.evt.layerX - layerX, y: event.evt.layerY - layerY }

    mouseConrollerStore.setPosition(pos.x, pos.y)
}
const getMousePosition = computed(() => {
    return mouseConrollerStore.getPositionInMap()
})
const dropOn=(event)=>{
    const dropOnX = event.layerX
    const dropOnY = event.layerY
    const layerX = layer.value.getNode().getX()
    const layerY = layer.value.getNode().getY()
    console.log("drop on ",event,layer.value.getNode(),{x:dropOnX-layerX,y:dropOnY-layerY})
}
getAssetFiles().then((res) => {
    console.log(res)
})

const sceneStroe = useScenesStore();
const director = useDirector();
const state = computed(() => {
    return sceneStroe.getState()
})
const layer = ref()
const stage = ref()
onMounted(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    configKonva.value.height = height
    configKonva.value.width = width
})
const configKonva = ref({
    width: 1327,
    height: 1000,
})
const camereState = computed(() => { return director.getCamereState() })
const configCamere = computed(() => {
    return { x: 0, y: 0 };
})
watch(camereState.value, async () => {
    layer.value.getNode().x(0 - camereState.value.x)
    layer.value.getNode().y(0 - camereState.value.y)
})
var imageObj1 = new Image();
imageObj1.onload = function () {
};
let url = ""
url = "asset/winter_groud.jpg"
imageObj1.src = url;
const background = {
    image: imageObj1,
    scaleX: 0.3,
    scaleY: 0.3
}
const configCircle = {
    radius: 10,
    fill: "red",
    stroke: "black",
    strokeWidth: 4
}



</script>