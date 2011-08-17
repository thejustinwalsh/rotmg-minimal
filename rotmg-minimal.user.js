// ==UserScript==
// @name Realm of The Mad God Minimalist
// @description Cleans up the webpage and enables auto content resizing for the game
// @match http://www.realmofthemadgod.com/
// @icon http://www.realmofthemadgod.com/favicon.ico
// @version 1.0
// ==/UserScript==

/*
Copyright (C) 2011 by Justin Walsh

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function() {
	var rotmg = null;
	var padding = 25;
	
	// Attempt to get the swf embed object from the dom
	var embedObjects = document.getElementsByTagName("embed");
	if (embedObjects.length > 0)
	{
		rotmg = embedObjects[0];
	}
	
	// The website has changed, bail
	if (!rotmg) return;
	
	// Install a resize handler so that we can maximize our playable screen
	var original_size = { width: parseInt(rotmg.width), height: parseInt(rotmg.height) }
	window.onresize = function(event) {

		// Calculate the desired size
		var desired_height = parseInt(window.innerHeight) - (padding * 2);
		var scale = desired_height / original_size.height;
		var desired_width = original_size.width * scale;
		
		// Set the desired size
		console.log("Desired width: " + desired_width + " Desired height: " + desired_height);
		rotmg.width = desired_width < original_size.width ? original_size.width : desired_width;
		rotmg.height = desired_height < original_size.height ? original_size.height : desired_height;
	}
	
	// Clear the extra fluff
	var extraElements = document.getElementsByTagName("p");
	for (var i = 0; i < extraElements.length; i++)
	{
		extraElements[i].style.display = "none";
	}
	
	// Set the padding so it frames up nicely
	rotmg.style.padding = padding+"px";	
	
	// Fire off a resize event once right away
	window.onresize(null);
})();