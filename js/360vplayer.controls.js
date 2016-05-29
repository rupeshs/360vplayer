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
//Sphere videp player volume control functionality
$(".sphere-volume-control").slider({

	animate: true,
	range: "min",
	value: 50,
	min: 0,
	max: 100,
	step: 10,


	change: function (event, ui) {

		var value = ui.value,
		volume = $('#sphere-mute-btn');
					
		 //setVolume(value);
		 video.volume = value / 100;

		if (value <= 5) {

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

//File browser
$("#browser").click(function () {
	$("input[type='file']").trigger('click');
});

$('input[type="file"]').change(function(e){
    var URL = window.URL || window.URL;
    var url = URL.createObjectURL(e.target.files[0]);
    //alert(url);
    loadVideo(url);
});
