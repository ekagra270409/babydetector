function setup() {
    canvas = createCanvas(480, 400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

img = "";
status = "";
objects = [];

function preload(){
    img = loadImage('babyimg.jpeg')
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function draw() {
    image(img, 0, 0, 480, 400);
    
    if(status != "")
    {
    
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Detecting Object";
            document.getElementById("object_detected").innerHTML = "Baby Detected";

            fill(255, 0 , 0);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}


function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}