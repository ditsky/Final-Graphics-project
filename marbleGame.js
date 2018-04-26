
/*
Game 0
This is a ThreeJS program which implements a simple game
The user moves a cube around the board trying to knock balls into a cone

*/


	// First we declare the variables that hold the objects we need
	// in the animation code
	var scene, renderer;  // all threejs programs need these
	var camera, avatarCam, edgeCam;  // we have two cameras in the main scene
	var avatar;
	// here are some mesh objects ...

	var cone;
	var startPosition = new THREE.Vector3(0,30,0);
	var level1;
	// var npc;

	var winScene, loseScene, winCamera, loseCamera, winText, loseText;





	var controls =
	     {fwd:false, bwd:false, left:false, right:false,
				speed:50, fly:false, reset:false}

	var gameState =
	     {score:0, health:10, scene:'main', camera:'none' }


	// Here is the main game control
  init(); //
	initControls();
	animate();  // start the animation loop!




	function createWinScene(){
		winScene = initScene();
		winText = createSkyBox('youwon.png',10);
		//endText.rotateX(Math.PI);
		winScene.add(winText);
		var light1 = createPointLight();
		light1.position.set(0,200,20);
		winScene.add(light1);
		winCamera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
		winCamera.position.set(0,50,1);
		winCamera.lookAt(0,0,0);

	}

	function createLoseScene(){
		loseScene = initScene();
		loseText = createSkyBox('youlose.png',10);
		//endText.rotateX(Math.PI);
		loseScene.add(loseText);
		var light2 = createPointLight();
		light2.position.set(0,200,20);
		loseScene.add(light2);
		loseCamera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
		loseCamera.position.set(0,50,1);
		loseCamera.lookAt(0,0,0);

	}

	/**
	  To initialize the scene, we initialize each of its components
	*/
	function init(){
      initPhysijs();
			scene = initScene();
			initRenderer();
			createWinScene();
			createLoseScene();
			createMainScene();
		}



	function createMainScene(){
      // setup lighting
			var light1 = createPointLight();
			light1.position.set(0,200,20);
			scene.add(light1);
			var light0 = new THREE.AmbientLight( 0xffffff,0.25);
			scene.add(light0);

			//createLevel1();
			// create main camera
			camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
			camera.position.set(0,50,0);
			camera.lookAt(0,0,0);
			// create the avatar
			avatarCam = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
			avatar = createAvatar();
			//if we use level 1 this is kinda close
			//avatar.position.set(0,70,300);
			//for the normal game
			avatar.position.set(0,30,0);
			scene.add(avatar);
			gameState.camera = avatarCam;

			edgeCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
      edgeCam.position.set(0,100,100);
			gameState.camera = edgeCam;

			createLevel1();
	}
function createBestLevel(){
	startPosition=new THREE.Vector3(0,30,0);

	// var background = createGround('vaporwave.jpg',100,100);
	// background.rotateX(90);
	// background.rotateZ(180);
	// background.position.z = -40;
	// scene.add(background);


	var grounddog = createGround('dogs.jpg', 40, 40);
	scene.add(grounddog);
	var plane2dog = createGround('green.jpg', 50, 50);
	plane2dog.position.x = -30;
	plane2dog.position.z = -45;

	plane2dog.addEventListener( 'collision',
		function(other_object) {
			if(other_object==avatar) {

					avatar.__dirtyPosition = true;
					avatar.position.set(30,0,-200);

			}
		}
			)
				scene.add(plane2dog);

	var plane4dog = createGround('dogs.jpg', 200, 50);
	plane4dog.position.x = 30;
	plane4dog.position.z = -200;
	plane4dog.position.y = 0;
	scene.add(plane4dog);

	var plane5dog = createGround('green.jpg', 50, 50);
	plane5dog.position.x = 157;
	plane5dog.position.z = -200;
	plane5dog.position.y = 0;

	plane5dog.addEventListener( 'collision',
		function(other_object) {
			if(other_object==avatar) {

					avatar.__dirtyPosition = true;
					avatar.position.set(120,0,-35);

			}
		}
			)
				scene.add(plane5dog);
	scene.add(plane5dog);

	var plane6dog = createGround('dogs.jpg', 70, 30);
	plane6dog.position.x = 120;
	plane6dog.position.z = -35;
	plane6dog.position.y = 0;


	scene.add(plane6dog);

	var plane7dog = createGround('dogs.jpg', 30, 150);
	plane7dog.position.x = 70;
	plane7dog.position.z = 25;
	plane7dog.position.y = 0;
	scene.add(plane7dog);



}
	function createLevel1() {
		startPosition = new THREE.Vector3(0,30,0);
		var light = createPointLight();
		light.position.set(0,200,20);
		// create the ground and the skybox
		var matrix = createSkyBox('matrix.jpg',2);
		scene.add(matrix);
		var ground = createGround('metallic.jpg', 40, 150);
		scene.add(ground);
		var plane2 = createGround('metallic.jpg', 160, 30);
		plane2.position.x = -60;
		plane2.position.z = -85;
		scene.add(plane2);

		var plane3 = createGround('metallic.jpg', 30, 150);
		plane3.position.x = -130;
		plane3.position.z = -145;
		plane3.position.y = 0;
		scene.add(plane3);
		//scene.add(skybox);

		var plane4 = createGround('metallic.jpg', 300, 50);
		plane4.position.x = 30;
		plane4.position.z = -200;
		plane4.position.y = 0;
		scene.add(plane4);

		var plane5 = createGround('metallic.jpg', 50, 200);
		plane5.position.x = 170;
		plane5.position.z = -120;
		plane5.position.y = 0;
		scene.add(plane5);

		var plane6 = createGround('metallic.jpg', 70, 30);
		plane6.position.x = 120;
		plane6.position.z = -35;
		plane6.position.y = 0;
		scene.add(plane6);

		var plane7 = createGround('metallic.jpg', 30, 150);
		plane7.position.x = 70;
		plane7.position.z = 25;
		plane7.position.y = 0;
		scene.add(plane7);


		var cone = createConeMesh(5,20);
		cone.position.set(70,20,70);
		scene.add(cone);
		cone.addEventListener( 'collision',
			function(other_object) {
				if(other_object==avatar) {
						scene.remove(ground);
						scene.remove(plane2);
						scene.remove(plane3);
						scene.remove(plane4);
						scene.remove(plane5);
						scene.remove(plane6);
						scene.remove(plane7);
						scene.remove(cone);
						avatar.__dirtyPosition = true;
						avatar.position.set(10,10,10);
						createLevel3();
				}
			})
	}

	function createLevel3() {
		startPosition = new THREE.Vector3(10,10,10);
		var ground = createGround('metallic.jpg', 75, 100);
		var light1 = createPointLight();
		light1.position.set(350,350,350);
		scene.add(ground);
		var plane = createGroundFric('ice.jpg', 50, 200, 0);
		plane.addEventListener( 'collision',
			function(other_object) {
				if(other_object==avatar) {
					controls.speed=140;
				}
			})
		plane.position.x = 0;
		plane.position.y = 58;
		plane.position.z = 130;
		plane.rotateX(-Math.PI/5);
		scene.add(plane);
		var plane2 = createGround('metallic.jpg', 60, 150);
		plane2.position.x = 0;
		plane2.position.y = 230;
		plane2.position.z = 295;
		scene.add(plane2);
		plane2.addEventListener( 'collision',
			function(other_object) {
				if(other_object==avatar) {
					controls.speed=50;
					avatar.__dirtyRotation = true;
					avatar.__dirtyPosition = true;
					avatar.rotation.set(0,0,0);
					avatar.position.set(305, 305, 305);
					avatar.setLinearVelocity(new THREE.Vector3(0,0,0));
					avatar.setAngularVelocity(new THREE.Vector3(0,0,0));
				}
			}
		)
		var plane3 = createGround('bernie.jpg', 150, 150);
		plane3.position.x = 300;
		plane3.position.y = 300;
		plane3.position.z = 300;
		scene.add(plane3);

		var cone = createConeMesh(5,20);
		cone.position.set(280, 320, 260);
		scene.add(cone);

	}


	function randN(n){
		return Math.random()*n;
	}




	function playGameMusic(){
		// create an AudioListener and add it to the camera
		var listener = new THREE.AudioListener();
		camera.add(listener);

		// create a global audio source
		var sound = new THREE.Audio(listener);

		// load a sound and set it as the Audio object's buffer
		var audioLoader = new THREE.AudioLoader();
		audioLoader.load( '/sounds/loop.mp3', function( buffer ) {
			sound.setBuffer( buffer );
			sound.setLoop( true );
			sound.setVolume( 0.05 );
			sound.play();
		});
	}

	function soundEffect(file){
		// create an AudioListener and add it to the camera
		var listener = new THREE.AudioListener();
		camera.add( listener );

		// create a global audio source
		var sound = new THREE.Audio( listener );

		// load a sound and set it as the Audio object's buffer
		var audioLoader = new THREE.AudioLoader();
		audioLoader.load( '/sounds/'+file, function( buffer ) {
			sound.setBuffer( buffer );
			sound.setLoop( false );
			sound.setVolume( 0.5 );
			sound.play();
		});
	}

	/* We don't do much here, but we could do more!
	*/
	function initScene(){
		//scene = new THREE.Scene();
    var scene = new Physijs.Scene();
		return scene;
	}

  function initPhysijs(){
    Physijs.scripts.worker = '/js/physijs_worker.js';
    Physijs.scripts.ammo = '/js/ammo.js';
  }
	/*
		The renderer needs a size and the actual canvas we draw on
		needs to be added to the body of the webpage. We also specify
		that the renderer will be computing soft shadows
	*/
	function initRenderer(){
		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight-50 );
		document.body.appendChild( renderer.domElement );
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	}


	function createPointLight(){
		var light;
		light = new THREE.PointLight( 0xffffff);
		light.castShadow = true;
		//Set up shadow properties for the light
		light.shadow.mapSize.width = 2048;  // default
		light.shadow.mapSize.height = 2048; // default
		light.shadow.camera.near = 0.5;       // default
		light.shadow.camera.far = 500      // default
		return light;
	}



	function createBoxMesh(color){
		var geometry = new THREE.BoxGeometry( 1, 1, 1);
		var material = new THREE.MeshLambertMaterial( { color: color} );
		mesh = new Physijs.BoxMesh( geometry, material );
    //mesh = new Physijs.BoxMesh( geometry, material,0 );
		mesh.castShadow = true;
		return mesh;
	}

	function createBoxMesh2(color,w,h,d){
		var geometry = new THREE.BoxGeometry( w, h, d);
		var material = new THREE.MeshLambertMaterial( { color: color} );
		mesh = new Physijs.BoxMesh( geometry, material );
		//mesh = new Physijs.BoxMesh( geometry, material,0 );
		mesh.castShadow = true;
		return mesh;
	}


		function createConeMesh(r,h){
			var geometry = new THREE.ConeGeometry( r, h, 32);

			var material = new THREE.MeshLambertMaterial( { color: 0xff0000, side:THREE.DoubleSide} );
			var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
			var mesh = new Physijs.ConeMesh( geometry, pmaterial, 0 );
			mesh.castShadow = true;
			return mesh;
		}

	function createGround(image, width, height){
		// creating a textured plane which receives shadows
		var geometry = new THREE.PlaneGeometry( width, height, 128 );
		var texture = new THREE.TextureLoader().load( '../images/'+image );
		// texture.wrapS = THREE.RepeatWrapping;
		// texture.wrapT = THREE.RepeatWrapping;
		// texture.repeat.set( 2, 2 );
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
		var pmaterial = new Physijs.createMaterial(material,0.9,0.05);
		//var mesh = new THREE.Mesh( geometry, material );
		var mesh = new Physijs.BoxMesh( geometry, pmaterial);

		mesh.receiveShadow = true;

		mesh.rotateX(Math.PI/2);
		return mesh
		// we need to rotate the mesh 90 degrees to make it horizontal not vertical
	}

	function createGroundFric(image, width, height, friction) {
		// creating a textured plane which receives shadows
		var geometry = new THREE.PlaneGeometry( width, height, 128 );
		var texture = new THREE.TextureLoader().load( '../images/'+image );
		// texture.wrapS = THREE.RepeatWrapping;
		// texture.wrapT = THREE.RepeatWrapping;
		// texture.repeat.set( 2, 2 );
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide});
		var pmaterial = new Physijs.createMaterial(material,friction,0.05);
		//var mesh = new THREE.Mesh( geometry, material );
		var mesh = new Physijs.BoxMesh( geometry, pmaterial);

		mesh.receiveShadow = true;

		mesh.rotateX(Math.PI/2);
		return mesh
	}



	function createSkyBox(image,k){
		// creating a textured plane which receives shadows
		var geometry = new THREE.SphereGeometry( 500, 500, 500 );
		var texture = new THREE.TextureLoader().load( '../images/'+image );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( k, k );
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
		//var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
		//var mesh = new THREE.Mesh( geometry, material );
		var mesh = new THREE.Mesh( geometry, material, 0 );

		mesh.receiveShadow = false;


		return mesh
		// we need to rotate the mesh 90 degrees to make it horizontal not vertical


	}

	function createAvatar(){

		var geometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
		var material = new THREE.MeshLambertMaterial( { color: 0xFFD700} );

		var pmaterial = new Physijs.createMaterial(material, .9, .95);
		//var mesh = new THREE.Mesh( geometry, material );
		var mesh = new Physijs.BoxMesh( geometry, pmaterial );
		mesh.setDamping(.1,.1);
		mesh.castShadow = true;

		avatarCam.position.set(0,4,0);
		avatarCam.lookAt(0,4,10);
		mesh.add(avatarCam);
		avatarCam.translateY(5.5);
    avatarCam.translateZ(25);

		return mesh;
	}

	/*function createLevel1(){
		var loader = new THREE.JSONLoader();
		loader.load("../models/marbleGame.json",
		function ( geometry, materials ) {
						var material = //materials[ 0 ];
						//new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
						new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.5 })
						level1 = new Physijs.BoxMesh( geometry, material, 0 );
						level1.scale.set(50,50,50);
						level1.translateY(-200);

						scene.add(level1);
		},
		function(xhr){
						console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );},
		function(err){console.log("error in loading: "+err);}
	)}*/



	var clock;

	function initControls(){
		// here is where we create the eventListeners to respond to operations

		  //create a clock for the time-based animation ...
			clock = new THREE.Clock();
			clock.start();

			window.addEventListener( 'keydown', keydown);
			window.addEventListener( 'keyup',   keyup );
  }

	function keydown(event){
		console.log("Keydown: '"+event.key+"'");
		//console.dir(event);
		// first we handle the "play again" key in the "youwon" scene
		if (gameState.scene == 'youwon' && event.key=='r') {
			gameState.scene = 'main';
			gameState.score = 0;

			return;
		}

		// this is the regular scene
		switch (event.key){
			// change the way the avatar is moving
			case "w": controls.fwd = true;  break;
			case "s": controls.bwd = true; break;
			case "a": controls.left = true; break;
			case "d": controls.right = true; break;
			case "r": controls.up = true; break;
			case "f": controls.down = true; break;
			case "m": controls.speed = 100; break;
      case " ": controls.fly = true;
          console.log("space!!");
          break;
      case "h": avatar.__dirtyPosition = true;
      avatar.position.set(startPosition.x,startPosition.y,startPosition.z);
			break;


			// switch cameras
			case "1": gameState.camera = camera; break;
			case "2": gameState.camera = avatarCam; break;
      case "3": gameState.camera = edgeCam; break;

			// move the camera around, relative to the avatar
			case "ArrowLeft": avatarCam.translateY(1);break;
			case "ArrowRight": avatarCam.translateY(-1);break;
			case "ArrowUp": avatarCam.translateZ(-1);break;
			case "ArrowDown": avatarCam.translateZ(1);break;
			case "[": avatarCam.translateX(-1);break;
			case "]": avatarCam.translateX(1);break;

		}

	}

	function keyup(event){
		//console.log("Keydown:"+event.key);
		//console.dir(event);
		switch (event.key){
			case "w": controls.fwd   = false;  break;
			case "s": controls.bwd   = false; break;
			case "a": controls.left  = false; break;
			case "d": controls.right = false; break;
			// case "r": controls.up    = false; break;
			// case "f": controls.down  = false; break;
			case "m": controls.speed = 50; break;
      case " ": controls.fly = false; break;
      //case "h": controls.reset = false; break;
		}
	}

  function updateAvatar(){
		"change the avatar's linear or angular velocity based on controls state (set by WSAD key presses)"
		if (avatar.position.y<-100){
      avatar.__dirtyPosition = true;
      avatar.position.set(0,30,0);
			gameState.health--;
			if(gameState.health==0) {
				gameState.scene='youlose';
			}
    }
		var forward = avatar.getWorldDirection();
		var gravity = new THREE.Vector3(0,-10,0);
		if (controls.fwd){
			avatar.setLinearVelocity(forward.multiplyScalar(controls.speed));
		} else if (controls.bwd){
			avatar.setLinearVelocity(forward.multiplyScalar(-controls.speed));
		} else {
			var velocity = avatar.getLinearVelocity();
			velocity.x=velocity.z=0;

			avatar.setLinearVelocity(velocity); //stop the xz motion
		}

    if (controls.fly){
      avatar.setLinearVelocity(new THREE.Vector3(0,controls.speed,0));
    }

		if (controls.left){
			avatar.setAngularVelocity(new THREE.Vector3(0,controls.speed*0.1,0));
		} else if (controls.right){
			avatar.setAngularVelocity(new THREE.Vector3(0,-controls.speed*0.1,0));
		} else {
			avatar.setAngularVelocity(new THREE.Vector3(0,0,0));
		}


	}

	function animate() {

		requestAnimationFrame( animate );

		switch(gameState.scene) {

			case "youwon":
				//endText.rotateY(0.005);
				renderer.render(winScene, winCamera);
				break;

			case "youlose":
			renderer.render(loseScene, loseCamera);
			break;

			case "main":
				updateAvatar();

        edgeCam.lookAt(avatar.position);
	    	scene.simulate();
				if (gameState.camera!= 'none'){
					renderer.render( scene, gameState.camera );
				}
				break;

			default:
			  console.log("don't know the scene "+gameState.scene);

		}

		//draw heads up display ..

	}
