import * as THREE from 'three';

function getTexture(){
  //纹理贴图加载器TextureLoader
  const texLoader = new THREE.TextureLoader();
  // .load()方法加载图像，返回一个纹理对象
  const texture = texLoader.load('./src/assets/images/1.png');
  return texture
}

const material = new THREE.SpriteMaterial({
  map: getTexture(),
  blending:THREE.AdditiveBlending,
  opacity: 0.3
})

const group = new THREE.Group();
for (let i = 0; i < 5000; i++) {
    // 精灵模型共享材质
    const sprite = new THREE.Sprite(material);
    group.add(sprite);
    sprite.scale.set(8, 8, 1);
    // 设置精灵模型位置，在长方体空间上上随机分布
    const x = 1000 * (Math.random() - 0.5);
    const y = 600 * Math.random();
    const z = 1000 * (Math.random() - 0.5);
    sprite.position.set(x, y, z)
}
// const sprite = new THREE.Sprite(material);

// sprite.scale.set(25, 25, 1);
// sprite.position.set(0,50,0)

// console.log('sprite-->',sprite)

function loop() {
  // loop()每次执行都会更新雨滴的位置，进而产生动画效果
  group.children.forEach(sprite => {
      // 雨滴的y坐标每次减1
      sprite.position.y -= 0.3;
      if (sprite.position.y < -300) {
          // 如果雨滴落到地面，重置y，从新下落
          sprite.position.y = 300;
      }
  });
  requestAnimationFrame(loop);
}
loop();

export default group