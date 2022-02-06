s="";
objectstatus="";
objects = [];

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    document.getElementById("status").innerHTML="Detecting Object";
    objectdetector=ml5.objectDetector("cocossd" ,modelLoaded);

}
function modelLoaded(){
    console.log('Model Is Initialized');
    objectstatus=true;
}

function preload(){
    s = loadSound("alarm.mp3");
}
function gotResults(error , results){
     if(error){
        console.log(error);
     }else{
         console.log(results);
         objects= results;
     }
     
}

function draw(){    
    image(video, 0 , 0 , 380 , 380);
       
       if(objectstatus!=""){
           r=random(255);
           g=random(255);
           b=random(255);
           objectdetector.detect(video , gotResults)
           if(objects.length<0){
            document.getElementById("status").innerHTML= "Status: Object Not Detected";
            s.play();
           }else{
               for(i=0; i<objects.length; i++)
            {
                document.getElementById("status").innerHTML= "Status: Object Detected";
                fill(r,g,b);
                if(objects[i].label=="person"){
                     document.getElementById("status").innerHTML="Status: Baby Found"
                     s.stop();
                }else{
                    document.getElementById("status").innerHTML="Status: Baby Not Found"
                    s.play();
                }
                percentage= floor(objects[i].confidence * 100);
                text(objects[i].label + " "+ percentage + "%" , objects[i].x , objects[i].y);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height );
            }}
       }
       
       
      
}
