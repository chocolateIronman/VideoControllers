document.addEventListener("DOMContentLoaded",handleDocumentLoad) /*loading the video indicating the main function (handleDocumentLoad)*/

function handleDocumentLoad() /*main function of video document which holds every function for the controllers of the video*/
{
	var myVideo=document.querySelector("video");/*storing the video in JavaScript variable*/
	
	var playButton=document.getElementById("playPause");/*storing the play button in JavaScript variable*/
	playButton.addEventListener("click",playPauseVideo);/*adding a listener which will respond to a mouse click from the user */
	function playPauseVideo()/*implementing the handler function describing what happens when the play button is clicked*/
	{
		if(myVideo.paused===true)/*assigning a true object property to check if the video is paused */
		{
			myVideo.play();/*a method playing the video*/
			playButton.innerHTML="Pause";/*when the play button is clicked to play the video the name of the button changes to pause*/
		}
		else
		{
			myVideo.pause();/*a method pausing the video*/
			playButton.innerHTML="Play";/*when the play button is clicked to pause the video the name of the button changes to play*/
		}
	}
/*-----------------------------------------------------------------*/
	var muteButton=document.getElementById("muteUnmute");/*storing the mute button in JavaScript value*/
	muteButton.addEventListener("click",muteUnmuteVideo);/*adding a listener which will respond to a click from the user*/
	function muteUnmuteVideo()/*implementing the handler function describing what happens when the mute button is clicked*/
	{
		if(myVideo.muted===false) //checks wether the two operands are identical>tests for the equality of both type and value
		{
			myVideo.muted=true;//if the button is pressed the video will be mutted
			muteButton.innerHTML="Unmute";//it changes the button name from Mute to Unmute
		}
		else
		{
			myVideo.muted=false;//sets the value of the mute button to false
			muteButton.innerHTML="Mute";//changes the button name from Unmute to Mute
		}
	}
/*-----------------------------------------------------------------*/
	var stopButton=document.getElementById("stopRewind");/*storing the stop button in JavaScript variable*/
	stopButton.addEventListener("click",stopVideo);/*adding a listener which will respond to a clicfk from the user*/
	function stopVideo()/*implementing the handler function describing what happens when the stop button is clicked*/
	{
			playButton.innerHTML="Play";//resets the name of the playButton
			myVideo.load();//method to reset and restart the video; not only the video will start from the begining when presing play but also will show the video poster
	}
/*-----------------------------------------------------------------*/
	var scrubSlider=document.getElementById("seekBar");/*storing the seek bar in JavaScript variable*/
	scrubSlider.addEventListener("input",scrubVideo);/*adding an event which will respond to a dragging from the user*/
	function scrubVideo()/*implementing the handler function describing what happens when the video is playing*/
	{
		var scrubTime=myVideo.duration*(scrubSlider.value/100);//it changes the duartion time when user moves the slider
		myVideo.currentTime=scrubTime;/*the current time of the video is the same set by the change of the slider position*/
	}
	myVideo.addEventListener("timeupdate",movePlaySlider);/*moving the slider with the playback of the video*/
	scrubSlider.addEventListener("mousedown",pauseSlider);/*pausing the video when the slider handle starts to be dragged*/
	scrubSlider.addEventListener("mouseup",resumeSlider);/*playing the video when the slider handle is released*/
	function movePlaySlider()/*implementing the handler function*/
	{
		if(myVideo.currentTime>0)/*condition: moving the slider only when the current playback time of the video is greater than 0*/
		{
			scrubSlider.value=(myVideo.currentTime/myVideo.duration)*100;
		}
		else/*reseting the position of the slider if the current playback time of the video is 0*/
		{
			scrubSlider.value=0;
		}
	}
	function pauseSlider()/*implementing the handler function*/
	{
		myVideo.pause();/*pausing the video*/
	}
	function resumeSlider()/*implementing the handler function*/
	{
		myVideo.play();/*playing the video*/
	}
/*-----------------------------------------------------------------*/
	var volumeSlider=document.getElementById("volumeSlider"); /*storing the volume slider in a JavaScript variable*/
	volumeSlider.addEventListener("input",volumeVideo);/* adding an event to the volume slider which will respond to dragging from the user*/
	function volumeVideo()/*implementing the handler function*/
	{
		myVideo.volume=this.value/10;/*setting the volume of the video while the user drags the volume handle*/
		
	}
/*-----------------------------------------------------------------*/
	var durationDisplay=document.getElementById("durationField");/*storing the blank duration field in a JavaScript variable*/
	durationDisplay.value=myVideo.duration;/*setting the value of the duration field*/
	myVideo.addEventListener("durationchange",displayDuration);/*adding an event which actually shows the lenght of the video */
	function displayDuration()/*implementing the handler function*/
	{
		var minutes=Math.floor(myVideo.duration/60);/*getting the minutes of the video by dividing the duration of the video by 60 and  using a maths function to present the result */
		var seconds=Math.floor(myVideo.duration%60);/*getting the seconds of the video using a maths function*/
		if(minutes<10) minutes="0"+minutes;/*condition: if the duration minutes of the video are less than 10 then before the digit there would be a zero */
		if(seconds<10) seconds="0" + seconds;/*condition: if the duration seconds of the video are less than 10 then before the digit there would be a zero*/
		durationDisplay.value=minutes + ":" + seconds;/*displaying the duration time in minutes and seconds*/
	}
/*-----------------------------------------------------------------*/
	var playbackDisplay=document.getElementById("playbackField");/*storing the blank playback time field in a JavaScript variable*/
	playbackDisplay.value=myVideo.currentTime;/*setting the value of the current playback time field*/
	myVideo.addEventListener("timeupdate",displayPlayback);/*adding an event which actually shows the current time of the video*/
	function displayPlayback()/*implementing the handler function*/
	{
		var minutes=Math.floor(myVideo.currentTime/60);/*getting the minutes of the current time of the video by dividing the current time of the video by 60 and using a maths function to present the result*/
		var seconds=Math.floor(myVideo.currentTime%60);/*getting the seconds of the video using a maths function*/
		if(minutes<10) minutes="0"+minutes;/*condition: if the current time minutes are less than 10 then before the digit there would be a zero*/
		if(seconds<10) seconds="0" + seconds;/*condition: if the current time seconds of the video are less than 10 then before the digit there would be a zero*/
		playbackDisplay.value=minutes + ":" + seconds;/*displaying the current playback time of the video in minutes and seconds*/
	}
/*-----------------------------------------------------------------*/
	var speedControl=document.getElementById("speedChanger");/*storing the option list in a JavaScript variable*/
	speedControl.addEventListener("change",changeSpeed);/*adding a listener which will change the speed of the video when an option is choosed*/
	function changeSpeed()/*implementing the handler function*/
	{
		myVideo.playbackRate=speedControl.value;/*setting the playback rate of the video to the value of the speed control option */
	}
/*-----------------------------------------------------------------*/
	var fastForwardButton=document.getElementById("fastForward");/*storing the fast forward button in a JavaScript variable*/
	fastForwardButton.addEventListener("mousedown",changeSpeedTripple);/*adding an event which changes the speed of the video 3 times when the mouse is pressed on the button by the user*/
	fastForwardButton.addEventListener("mouseup",changeSpeedDouble);/*adding an event which changes the speed of the video 2 times when the mouse is released by the user*/
	fastForwardButton.addEventListener("dblclick",changeSpeedNormal);/*adding an event which restores the normal speed of the video when the fast forward button is clicked twice by the user*/
	
	function changeSpeedTripple()/*implementing the handler function*/
	{
		var trippleSpeed=3;/*setting a variable with a value 3*/
		myVideo.playbackRate=trippleSpeed;/*setting the playback rate of the video to the variable >> 3 times faster than the normal speed */
		fastForwardButton.innerHTML="FFx3";//changing the name of the button
	}
	function changeSpeedDouble()/*implementing the handler function*/
	{
		var doubleSpeed=2;/*setting a variable with a value 2*/
		myVideo.playbackRate=doubleSpeed;/*setting the playback rate of the video to the variable>> 2 times faster than the normal speed*/
		fastForwardButton.innerHTML="FFx2";//changing the name of the function
	}
	function changeSpeedNormal()/*implementing the handler function*/
	{
		var normalSpeed=1;/*setting a variable with a value 1*/
		myVideo.playbackRate=normalSpeed;/*setting the playback rate of the video to the variable>> the normal speed of the video*/
		fastForwardButton.innerHTML="FF";//changing the name of the button
	}
}