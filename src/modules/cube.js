import * as THREE from 'three';

// 创建 cube
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({
  color: 0xff0000,
});
const cube = new THREE.Mesh(geometry, material);

// 初始化 cube 的位置
cube.position.set(0, 0, 0);

export default cube;
