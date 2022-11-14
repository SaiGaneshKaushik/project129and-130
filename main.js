sound1 = "";
sound2 ="";
song_ignite = "";
leftwrist_x = 0;
leftwrist_y = 0;
rightwrist_x= 0;
rightwrist_y = 0;
score_leftwrist = 0;
score_rightwrist = 0;
song1_status = "";
song2_status = "";


function preload(){
  sound1 = loadSound("peterpan.mp3");
  sound2 = loadSound("harrypotter.mp3");
}
function setup(){
  canvas = createCanvas(600,500);
  canvas.position(430, 200);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}
function modelLoaded(){
  console.log("model is loaded");
}
function gotPoses(results){
  if(results.length > 0)
    {
      console.log(results);
      score_leftwrist = results[0].pose.keypoints[9].score;
      console.log("left wrist score = " + score_leftwrist);
      score_rightwrist = results[0].pose.keypoints[10].score;
      console.log("right wrist score = " + score_rightwrist);
      leftwrist_x = results[0].pose.leftWrist.x;
      leftwrist_y = results[0].pose.leftWrist.y;
      rightwrist_x = results[0].pose.rightWrist.x;
      rightwrist_y = results[0].pose.rightWrist.y;
      console.log("leftWrist_x = " + leftwrist_x + "leftWrist_y = " + leftwrist_y + "rightWrist_x = " + rightwrist_x + "rightWrist_y = " + rightwrist_y);
    }
}
function draw(){
  image(video, 0, 0, 600, 500);

  song1_status = sound1.isPlaying();
  song2_status = sound2.isPlaying();

  fill("purple");
  stroke("purple");

  if(score_rightwrist > 0.2 ){
   circle(rightwrist_x, rightwrist_y, 20);
   sound2.stop();
   if(song1_status == false){
    sound1.play();
    document.getElementById("songName").innerHTML="song: peterpan";
  }
}
if(score_leftwrist > 0.2 ){
  circle(leftwrist_x, leftwrist_y, 20);
  sound1.stop();
  if(song2_status == false){
   sound2.play();
   document.getElementById("songName").innerHTML="song: harrypotter";
 }
}
}