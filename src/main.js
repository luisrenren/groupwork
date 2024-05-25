// 入口文件
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { Clock } from 'three';

//模型
import cube from "./modules/cube.js";
import girl from './modules/girl.js';
import castle from './modules/castle.js';
import animal from './modules/animal.js';

// 全局变量
let camera,
  scene,
  renderer,
  stats,
  gui,
  settings;

let ambientLight, pointLight;
const clock = new Clock();

function init() {
  initScene();
  initCamera();
  initLight();
  initRenderer();
  initEventListeners(); // 初始化事件监听器
}

// 初始化场景
function initScene() {
  scene = new THREE.Scene();
  //添加物体
  //scene.add(cube);
  scene.add(girl[0])
  scene.add(castle[0])
  scene.add(animal[0],animal[1],animal[2],animal[3])
}

//相机
function initCamera() {
  camera = new THREE.PerspectiveCamera(
    90,  // 视野角度
    window.innerWidth / window.innerHeight,  //长宽比
    0.1,  //近截面
    1000,  //远截面
  );
  camera.position.set(-30, 10, 35);
  camera.lookAt(0, 0, 0);
}

//光源
function initLight(params) {
  //环境光
  ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  //点光源
  pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(30, 30, 30);
  pointLight.decay = 0;  //设置光源不随距离衰减
  scene.add(pointLight);

  // 点光源辅助观察
  const pointLightHelpler = new THREE.PointLightHelper(pointLight);
  scene.add(pointLightHelpler);
}

//渲染
function initRenderer(params) {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor('#63b7ef',1.0);
  renderer.render(scene, camera);

  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize); // 使用 addEventListener 监听 resize 事件

  //视图辅助
  initHelper();
}

//动画
function animate() {
  // 更新立方体位置
  // console.log(girl,"girl")
  updateCubePosition();

  renderer.setAnimationLoop(()=>{
    //浏览器刷新的时候浏览器重新渲染
    renderer.render(scene,camera);
    //requestAnimationFrame(animate);

    const delta = clock.getDelta();
    animal.forEach(animal => animal.tick(delta));

    //stats.update();
})
  // 请求下一帧动画
  requestAnimationFrame(animate);
}

//窗口被调整大小时发生
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

// 坐标系辅助对象、创建轨道控制器、创建stats对象 等辅助工具
function initHelper() {
  //坐标轴辅助线
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);
  //轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', () => {
    renderer.render(scene, camera);
  });

  //参数1 网格大小 参数2 分成几份 参数3  中心轴颜色 参数4 网格线的颜色
  const gridHelper = new THREE.GridHelper(1000, 100, 0x000000, 0x0000ff);
  scene.add(gridHelper);

  //创建stats对象
  stats = new Stats();
  document.body.appendChild(stats.domElement);
}

// 初始化事件监听器
function initEventListeners() {
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
}

// 定义移动方向
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

// 定义移动速度
const movementSpeed = 1;

// 处理按键按下事件的函数
function handleKeyDown(event) {
  const keyCode = event.code;
  console.log(keyCode)
  switch (keyCode) {
    case 'KeyW':
      moveForward = true;
      console.log("WWW")
      break;
    case 'KeyA':
      moveLeft = true;
      break;
    case 'KeyS':
      moveBackward = true;
      break;
    case 'KeyD':
      moveRight = true;
      break;
  }
}

// 处理按键松开事件的函数
function handleKeyUp(event) {
  const keyCode = event.code;
  switch (keyCode) {
    case 'KeyW':
      moveForward = false;
      break;
    case 'KeyA':
      moveLeft = false;
      break;
    case 'KeyS':
      moveBackward = false;
      break;
    case 'KeyD':
      moveRight = false;
      break;
  }
}

// 更新立方体位置

function updateCubePosition() {
  if (moveForward) {
    girl[0].position.z -= movementSpeed;
  }
  if (moveLeft) {
    girl[0].position.x -= movementSpeed;
  }
  if (moveBackward) {
    girl[0].position.z += movementSpeed;
  }
  if (moveRight) {
    girl[0].position.x += movementSpeed;
  }

  // 同时更新相机位置，保持与立方体的相对位置不变
  const cameraOffset = new THREE.Vector3(-30, 10, 35); // 相机相对立方体的偏移量
  const cameraTarget = girl[0].position.clone().add(cameraOffset); // 相机的目标位置
  camera.position.copy(cameraTarget); // 更新相机位置
  camera.lookAt(girl[0].position); // 让相机始终朝向立方体
}


// 初始化
init();

// 开始动画循环
animate();
