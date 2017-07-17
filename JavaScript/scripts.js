var scene = new THREE.Scene();

var W = window.innerWidth;
var H = window.innerHeight;

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setSize(W, H);

var camera = new THREE.PerspectiveCamera(100, W / H, 0.1, 10000);

var planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 800, 100);
var planeMaterial = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -0.4 * Math.PI;

plane.position.set(0, 0, 0);

scene.add(plane);

camera.position.set(0, 180, 80);
camera.lookAt(scene.position);

document.body.appendChild(renderer.domElement);

(function drawFrame(ts){
  var center = new THREE.Vector2(0,0);
  window.requestAnimationFrame(drawFrame);
  var vLength = plane.geometry.vertices.length;
  for (var i = 0; i < vLength; i++) {
    var v = plane.geometry.vertices[i];
    var dist = new THREE.Vector2(v.x, v.y).sub(center);
    var size = 20;
    var magnitude = 10 ;
    v.z = Math.sin(dist.length()/-size + (ts/900)) * magnitude;
  }

  plane.geometry.verticesNeedUpdate = true;
  renderer.render(scene, camera);
}());