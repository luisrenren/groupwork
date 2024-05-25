import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


function setupModel(data){
    const model = data.scene.children[0];
    const clip = data.animations[0];

    //播放器
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip);

    action.play();
    model.tick = (delta) => mixer.update(delta);

    return model;
}

const loader = new GLTFLoader();

const [sharkData,storkData,storkData2,storkData3] = await Promise.all([
    loader.loadAsync('./src/assets/models/squidshark.glb'),
    loader.loadAsync('./src/assets/models/Stork.glb'),
    loader.loadAsync('./src/assets/models/Stork.glb'),
    loader.loadAsync('./src/assets/models/Stork.glb'),
])

const shark =setupModel(sharkData);
const stork =setupModel(storkData);
const stork2 =setupModel(storkData2);
const stork3 =setupModel(storkData3);

shark.position.set(15,10,15)
shark.scale.set(100,100,100)

stork.position.set(15,40,0)
stork.scale.set(0.1,0.1,0.1)

stork2.position.set(-30,15,10)
stork2.scale.set(0.1,0.1,0.1)

stork3.position.set(40,15,40)
stork3.scale.set(0.1,0.1,0.1)

const direction=1;

function loop() {
    shark.position.y=10 + Math.random() * 0.2;
    requestAnimationFrame(loop);
  }
  loop();

export default [shark,stork,stork2,stork3];