let video = document.querySelector("video");
let vidBtn = document.querySelector("button#record");
let capBtn = document.querySelector("button#capture");

let audio = document.querySelector("audio");
let constraints = {video : true , audio:true };
let mediaRecorder;
let isRecording = false;
let chunks =[];

vidBtn.addEventListener("click",function(){
    if(isRecording){
       mediaRecorder.stop();
       isRecording = false;
       vidBtn.innerText = "Record";
    } else {
        mediaRecorder.start();
        isRecording = true;
        vidBtn.innerText = "Recording..."
    }

});

capBtn.addEventListener("click",function(){
    capture();
});
navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream){
  video.srcObject = mediaStream;
  let options = {mimeType : "video/webm; codecs=vp9"};
  mediaRecorder = new MediaRecorder(mediaStream,options);
 mediaRecorder.addEventListener("dataavailable",function(e){
   chunks.push(e.data);
 }); 

 mediaRecorder.addEventListener("stop",function(){
   let blob = new Blob (chunks,{type:"video/mp4"});
   chunks = [];

   let url = URL.createObjectURL(blob);
   let a = document.createElement("a");
   a.href = url; 
   a.download = "video.mp4";
   a.click();
   a.remove();
 });
});
function capture(){
    let c = document.createElement("canvas");
    c.width = video.videoWidth;
    c.height = video.videoHeight;
    let ctx = c.getContext("2d");
    ctx.drawImage(video,0,0);
    let a = document.createElement("a");
    a.download = "image.png";
    a.href = c.toDataURL();
    a.click();
    a.remove(); 
      
}