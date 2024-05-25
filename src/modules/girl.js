import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


function setupModel(data){
    const model = data.scene.children[0];
    return model;
}

const loader = new GLTFLoader();

const [girlData] = await Promise.all([
    loader.loadAsync('./src/assets/models/girl.glb'),

])

const girl =setupModel(girlData);

girl.position.set(0,0,0)



export default [girl];