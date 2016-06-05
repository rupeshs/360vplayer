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

var playpause;
var stop;
var mute;
var progress;
var progressBar;
var fullscreen;
var timelabel;
var timeduration;
var videoContainer;
  function initControls(){
	 playpause = document.getElementById('sphere-playpause-control');
   	stop = document.getElementById('stop');
   	mute = document.getElementById('sphere-mute-btn');
   	
   	seekbar = document.getElementById('sphere-seek-ctrl');
    progressBar = document.getElementById('progress-bar');
   	fullscreen = document.getElementById('sphere-fullscreen');
    timelabel=document.getElementById("sphere-current-duration");
    timeduration=document.getElementById("sphere-total-duration");
	
	videoContainer = document.getElementById('videoContainer');
	videoControls = document.getElementById('video-controls');
    seekbar.addEventListener("change",vidSeek,false);
	video.addEventListener("timeupdate",seektimeupdate,false);  
	}

 
 var load360Video=function(){
 
	// Check if the browser supports the Fullscreen API
    var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
    // If the browser doesn't support the Fulscreen API then hide the fullscreen button
    
    if (!fullScreenEnabled) {

      fullscreen.style.display = 'none';
    }

   	// Change the volume
   	var alterVolume = function(dir) {
   		var currentVolume = Math.floor(video.volume * 10) / 10;
   		if (dir === '+') {
   			if (currentVolume < 1) video.volume += 0.1;
   		}
   		else if (dir === '-') {
  			if (currentVolume > 0) video.volume -= 0.1;
   		}
   	}

    function setVolume(val) {
   		video.volume=val/100;
   	}
   	// Set the video container's fullscreen state
  	var setFullscreenData = function(state) {
  
      
  		//videoContainer.setAttribute('data-fullscreen', !!state);
  	}

  	// Checks if the document is currently in fullscreen mode
   	var isFullScreen = function() {
   		return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
   	}

   	// Fullscreen
   	var handleFullscreen = function() {
   		// If fullscreen mode is active...	
    		if (isFullScreen()) {
    			// ...exit fullscreen mode
    			// (Note: this can only be called on document)
    			if (document.exitFullscreen) document.exitFullscreen();
    			else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    			else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
    			else if (document.msExitFullscreen) document.msExitFullscreen();
    			camera.aspect=100/200;
				launchIntoFullscreen(document.getElementById("videoContainer"));
				
    		}
    		else {
    		  // ...otherwise enter fullscreen mode
    			// (Note: can be called on document, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)
          if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
    		  else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
    		  else if (videoContainer.webkitRequestFullScreen) {
    			launchIntoFullscreen(document.getElementById("videoContainer"));
				
    			}
    			else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();	
    		}
			}
          video.addEventListener('ended', function() {
   			if($('#sphere-playpause-control').find($(".fa")).hasClass('fa-pause-circle'))
               {//alert("dfd");
				$('#sphere-playpause-control').find($(".fa")).removeClass('fa-pause-circle').addClass('fa-play-circle');
			   }
   		});
   	// Only add the events if addEventListener is supported (IE8 and less don't support it, but that will use Flash anyway)
   	if (document.addEventListener) {
   		// Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
   		video.addEventListener('loadedmetadata', function() {
   		
			
			//progress.setAttribute('max', video.duration);
			
		    //progress.setAttribute('value', 10);
			//alert(progress.getAttribute('value'));
			timelabel.innerHTML=secondsToTime(0);
		   timeduration.innerHTML="/ "+secondsToTime(video.duration);
			if($('#sphere-playpause-control').find($(".fa")).hasClass('fa-pause-circle'))
               {//alert("dfd");
				$('#sphere-playpause-control').find($(".fa")).removeClass('fa-pause-circle').addClass('fa-play-circle');
			   }
   		});

   		// Add events for all buttons
		video.onwaiting = function() {
         $(".sphere-buffering-spinner").fadeIn();
          };
		  video.onplaying = function() {
          $(".sphere-buffering-spinner").fadeOut();
          };
   		$("#sphere-playpause-control").click(function (event) {
   			if (video.paused || video.ended) 
			{   
		     if($(this).find($(".fa")).hasClass('fa-play-circle'))
               {//alert("dfd");
				$(this).find($(".fa")).removeClass('fa-play-circle').addClass('fa-pause-circle');
			   }
			   var val = $('.sphere-volume-control').slider("option", "value");
			    video.volume=val/100;
				video.play();
				
			}
			
   			else {
			if($(this).find($(".fa")).hasClass('fa-pause-circle'))
               {
			$(this).find($(".fa")).removeClass('fa-pause-circle').addClass('fa-play-circle');
			   }
				video.pause();}
   		});

   		// The Media API has no 'stop()' function, so pause the video and reset its time and the progress bar
   		/*stop.addEventListener('click', function(e) {
   			video.pause();
   			video.currentTime = 0;
   			progress.value = 0;
   		});*/
   		mute.addEventListener('click', function(e) {
   			var volume = $('#sphere-mute-btn');
			if (!video.muted)
			{
		    
			volume.css('background-position', '0 0');
			video.muted = true;
			}
			else{
				video.muted = false;
				var value = $('.sphere-volume-control').slider("option", "value");
				if(value <= 5) {
					
						volume.css('background-position', '0 0');
					} 
					else if (value <= 25) {
						volume.css('background-position', '0 -25px');
					} 
					else if (value <= 75) {
						
						volume.css('background-position', '0 -50px');
					} 
					else {
						volume.css('background-position', '0 -75px');
					};
			}
			
			
   		});
   		
   		
   		fullscreen.addEventListener('click', function(e) {
   			handleFullscreen();
   		});

   		// As the video is playing, update the progress bar
   		/*video.addEventListener('timeupdate', function() {
        
		
		//
		// For mobile browsers, ensure that the progress element's max attribute is set
        if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
        timelabel.innerHTML=secondsToTime(video.currentTime);
		timeduration.innerHTML="/ "+secondsToTime(video.duration);
		//progress.value = video.currentTime;
		progress.setAttribute('value',video.currentTime);
      //  progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
   		});

      // React to the user clicking within the progress bar
      progress.addEventListener('click', function(e) {
        var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth;
        video.currentTime = pos * video.duration;
		});*/

   		// Listen for fullscreen change events (from other controls, e.g. right clicking on the video itself)
   		document.addEventListener('fullscreenchange', function(e) {
   			setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
   		});
   		document.addEventListener('webkitfullscreenchange', function() {
   			setFullscreenData(!!document.webkitIsFullScreen);
   		});
   		document.addEventListener('mozfullscreenchange', function() {
   			setFullscreenData(!!document.mozFullScreen);
   		});
   		document.addEventListener('msfullscreenchange', function() {
   			setFullscreenData(!!document.msFullscreenElement);
   		});
   	}
  }
function vidSeek(){
	var seekto = video.duration * (seekbar.value / 100);
	video.currentTime = seekto;
}

// Find the right method, call on correct element
function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
 function secondsToTime(secs) 
   { 	    	
      var hours = Math.floor(secs / (60 * 60));
    	
      var divisor_for_minutes = secs % (60 * 60);
      var minutes = Math.floor(divisor_for_minutes / 60);
    	
      var divisor_for_seconds = divisor_for_minutes % 60;
      var seconds = Math.ceil(divisor_for_seconds);
    	
    var durstr;
	 if (hours>0)
	 {durstr= intToString(hours)+":" +intToString(minutes)+":" +intToString(seconds) ;
	 }
	 else 
	 {
		 durstr= intToString(minutes)+":" +intToString(seconds) ;
	 }
	  return durstr;
	  }
	 /* ensure that each time is set in 2 characters according to the time format */
	  function intToString(time) 
   {    	    	
      return (parseInt(time) < 10 ? ("0" + time) : time);    	
   }
   

function seektimeupdate(){

	timelabel.innerHTML=secondsToTime(video.currentTime);
	timeduration.innerHTML="/ "+secondsToTime(video.duration);

	var nt = video.currentTime * (100 / video.duration);
	seekbar.value = nt;
	$('.range').css(
      'background',
      'linear-gradient(to right, rgb(36, 199, 84) 0%, rgb(85, 206, 65) ' + seekbar.value + '%, #777 ' + seekbar.value + '%, #777 ' 
    );
}
 