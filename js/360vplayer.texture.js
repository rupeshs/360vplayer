/*  360VPlayer,360 degree video player
    Copyright (C) 2016 Rupesh Sreeraman
    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
*/

"use strict";
var video;
var camera;
var renderer;
var scene;
var mesh;
var videoTexture;
var keyboard;
var videotexture;
var pct;
var container;
var md;
$(document).ready(function () {
	
	pct = 1;
	//init about popup
	$('#sphere_about_popup').popup({
		opacity: 0.3,
		transition: 'all 0.3s'
	});
    //browser dection
	md = new MobileDetect(window.navigator.userAgent);

	$('html,body').css('cursor', '-webkit-grab');

	var updateFcts = [];

    video = document.createElement('video');
	container = $('#videoContainer');
	
	initControls();
	loadVideo("spacex-rocket-landing.mp4");

	updateFcts.push(
		function (delta, now) {
	 
			//videoTexture.update(delta, now);
			if (video.readyState == video.HAVE_ENOUGH_DATA) {
				videotexture.needsUpdate = true;
			}
			renderer.render(scene, camera);
		}

	)
	
	
	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		
		handleKeyboard();
		//Rotate within control 
         handleMouseTouch();
		 
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		updateFcts.forEach(function(updateFn){
			updateFn(deltaMsec/1000, nowMsec/1000)
		})
	})
	
});

function createScene()
{
  scene = new THREE.Scene();
}

function createCamera()
{
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
	
}

function initRenderer() {

	renderer = new THREE.WebGLRenderer({
		antialias: true

	});

	renderer.setSize(window.innerWidth, window.innerHeight);
   
	//attach the render-supplied DOM element
	container.append(renderer.domElement);
	keyboard = new THREEx.KeyboardState(renderer.domElement);
	renderer.domElement.setAttribute("tabIndex", "0");
	renderer.domElement.focus();

}

function loadVideo(murl) {
	//Init scene
	createScene();
	//Init camera
	createCamera();
	//Init webgl renderer
	initRenderer();
	
	lookfirst = true;
	
	//var fileURL = URL.createObjectURL(url)
	var url = 'spacex.mkv'
	
	//create the videoTexture
	video.controls = false;
	video.width	= 320;
	video.height	= 240;
	video.autoplay	= false;
	video.loop	= false;
	video.src	= murl;
    videotexture	= new THREE.Texture( video );

   if (pct==1)
   {
	   load360Video();
	   pct=2;
   }
	
	// creation of a big sphere geometry
	var sphere = new THREE.SphereGeometry(500, 60, 40);
	sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
	var material = new THREE.MeshBasicMaterial({
		map: videotexture
	});
	mesh = new THREE.Mesh(sphere, material);
	scene.add(mesh);
	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	//alert(isChrome);
	if (md.mobile())
	{

		$("#navctrl").css("display", "none");
	}
	else{
	
		var poscy=window.innerHeight -150;
	$("#navctrl").css("bottom",poscy+ "px");
		}
}

function handleMouseTouch() {
	
	if (mouselY < window.innerHeight - $("#sphere-video-controls-container").height()) {


		if (!lookfirst) {
			//horizontal rotation   
			mesh.rotation.y += (targetRotationX - mesh.rotation.y) * 0.1;
        
			//vertical rotation 
			finalRotationY = (targetRotationY - mesh.rotation.x);


			if (mesh.rotation.x <= 1 && mesh.rotation.x >= -1) {

				mesh.rotation.x += finalRotationY * 0.1;
			}

			if (mesh.rotation.x > 1) {

				mesh.rotation.x = 1
			}
			else if (mesh.rotation.x < -1) {

				mesh.rotation.x = -1
			}
		}

	}
}


function handleKeyboard() {
	//Keyboard controls
	if (keyboard.pressed('left')) {

		targetRotationX -= 0.03;

	} else if (keyboard.pressed('right')) {
		targetRotationX += 0.03;

	}
	else if (keyboard.pressed('down')) {
		targetRotationY += 0.03;

	} else if (keyboard.pressed('up')) {
		targetRotationY -= 0.03;

	}
}

$(window).resize(function () {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	//Adjust renderer
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	if (!md.mobile()) {
		var poscy = window.innerHeight - 150;
		$("#navctrl").css("bottom", poscy + "px");
	}
	
});
 