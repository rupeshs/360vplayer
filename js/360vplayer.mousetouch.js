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

var mouselY;
var lookfirst;

var targetRotationX = 0;
var targetRotationOnMouseDownX = 0;

var targetRotationY = 0;
var targetRotationOnMouseDownY = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;

var windowHalfX = window.innerWidth / 4;
var windowHalfY = window.innerHeight / 4;

var finalRotationY;

document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener( 'touchstart', onDocumentTouchStart, false );
document.addEventListener( 'touchmove', onDocumentTouchMove, false );

function onDocumentMouseDown( event ) {
	renderer.domElement.focus();
	lookfirst=false;
   //event.preventDefault();
 $('html,body').css('cursor','-webkit-grabbing');
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'mouseout', onDocumentMouseOut, false );

        mouseXOnMouseDown = event.clientX - windowHalfX;
        targetRotationOnMouseDownX = targetRotationX;
        
        mouseYOnMouseDown = event.clientY - windowHalfY;
        targetRotationOnMouseDownY = targetRotationY;

}

function onDocumentMouseMove( event ) {

mouselY=event.clientY;
//console.log(mouselY);
if (!lookfirst)
{       mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;


        targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.005;
        targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.005;
 }
}

function onDocumentMouseUp( event ) {

         $('html,body').css('cursor','-webkit-grab');
        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentTouchStart(event) {

        if (event.touches.length == 1) {

              //  event.preventDefault();

                mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
                targetRotationOnMouseDownX = targetRotationX;

                mouseYOnMouseDown = event.touches[0].pageY - windowHalfY;
                targetRotationOnMouseDownY = targetRotationY;



        }

}

function onDocumentTouchMove(event) {
        mouselY=event.touches[0].pageY;
        if (event.touches.length == 1) {

                //event.preventDefault();

                mouseX = event.touches[0].pageX - windowHalfX;
                targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.008;

                mouseY = event.touches[0].pageY - windowHalfY;
                targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.008;

        }

}
