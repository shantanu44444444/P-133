img = "";
status = "";
objects = [];


function preload(){
   img = loadImage('bottle.jpg');
}

function setup(){
    canvas = createCanvas(640 , 620);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded );
    document.getElementById("status").innerHTML = "Status : Detecting Objects ";

}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img , gotResults);
}

function gotResults(error , results){
    if(error){
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function draw() {
    image(img , 0, 0, 640 , 620);

    if(status != ""){
        for( i = 0; i < objects.length; i++ ){
            document.getElementById("status").innerHTML = "Status : Detected Objects";

            fill("#c71c5b");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 10 , objects[i].y + 20 );
            noFill();
            stroke("#c71c5b");
            rect( objects[i].x - 200 , objects[i].y - 200 , objects[i].width , objects[i].height );

        }
    }
}