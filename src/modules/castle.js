import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


function setupModel(data){
    const model = data.scene.children[0];
    return model;
}

const loader = new GLTFLoader();

const [castleData] = await Promise.all([
    loader.loadAsync('./src/assets/models/castle.glb'),

])

const castle =setupModel(castleData);

castle.position.set(0,32.5,0)
castle.scale.set(50,50,50)


export default [castle];