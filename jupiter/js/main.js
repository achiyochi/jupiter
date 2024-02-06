let container = document.getElementById('container');
let camera = new THREE.Camera();
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer();
let uniforms = {
	u_time: {
		type: "f", value: 20
	},
	u_resolution: {
		type: "v2",
		value: new THREE.Vector2()
	},
	u_mouse: {
		type: "v2",
		value: new THREE.Vector2()
	}
};

function init() {
	let geometry = new THREE.PlaneGeometry(2, 2);
	let material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent
	});

	let mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer.setPixelRatio(window.devicePixelRatio);

	container.appendChild(renderer.domElement);

	onWindowResize();

	window.addEventListener('resize', onWindowResize, false);

	document.onmousemove = function(e) {
		uniforms.u_mouse.value.x = e.pageX / 1000;
		uniforms.u_mouse.value.y = e.pageY / 1000;
		console.log(uniforms.u_mouse.value);
	}

	animate();
}

function onWindowResize(event) {
	renderer.setSize(window.innerWidth, window.innerHeight);
	uniforms.u_resolution.value.x = renderer.domElement.width;
	uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
	render();
	requestAnimationFrame(animate);
}

function render() {
	uniforms.u_time.value += 0.0024;
	renderer.render(scene, camera);
}

container.addEventListener('mousemove', document.onmousemove);

init();
