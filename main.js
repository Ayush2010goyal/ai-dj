song="";
LeftWristX=0;
RightWristX=0;
LeftWristY=0;
RightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
status_song1="";
status_song2="";

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video , ModelLoaded);
    poseNet.on('pose' , GotPoses);
}

function draw(){
    image(video,0,0,600,500);
    status_song1 = status_song.isPlaying();
    status_song2 = status_song.isPlaying();
    fill('#FF0000');
    stroke('#FF0000');

    if (scoreLeftWrist > 0.2){
        circle(LeftWristX , LeftWristY , 20);
        status_song2.stop();

        if(status_song1 == false){
        song.play();
        document.getElementById("play_button").innerHTML= "Song Name - Harry Potter Theme";
        }
    }   

    if (scoreRightWrist > 0.2){
        circle(RightWristX , RightWristY , 20);
        status_song1.stop();

        if(status_song2 == false){
        song.play();
        document.getElementById("play_button").innerHTML= "Song Name - Peter Pan Theme";
        }
    }   
}

function preload(){
    song=loadSound('music.mp3');
    song2=loadSound('music2.mp3');
}

function play(){
    song.play();
    song.rate(1);
}

function ModelLoaded(){
    console.log("PoseNet Is Initialized !");
}

function GotPoses(results){
if (results.length > 0){
    console.log(results);
    LeftWristX=results[0].pose.leftWrist.x;
    RightWristX=results[0].pose.rightWrist.x;
    LeftWristY=results[0].pose.leftWrist.y;
    RightWristY=results[0].pose.rightWrist.y;
    console.log("Left Wrist X = " + LeftWristX);
    console.log("Right Wrist X = " + RightWristX);
    console.log("Left Wrist Y = " + LeftWristY);
    console.log("Right Wrist Y = " + RightWristY);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log(scoreLeftWrist);
    scoreRightWrist=results[0].pose.keypoints[10].score;
    console.log(scoreRightWrist);
}
}