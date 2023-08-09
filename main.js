Webcam.set({
    width: 350,
    height: 350,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById('camera');
Webcam.attach('#camera');
function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/SqHnbN0qU/model.json", modelLoaded);
function modelLoaded() {
    console.log("Model Loaded!!!");
}
function speak() {
    synth = window.speechSynthesis;
    prediction = speak_data;
    utterData = new SpeechSynthesisUtterance(prediction);
    synth.speak(utterData);
}
function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("gesture_name").innerHTML = results[0].label;
        if(results[0].label == "Amazing"){
            speak_data = "This is looking amazing!";
            document.getElementById("update").innerHTML = "&#128076;";
        }
        else if(results[0].label == "Best"){
            speak_data = "All the Best!";
            document.getElementById("update").innerHTML = "&#128077;";
        }
        else if(results[0].label == "Victory"){
            speak_data = "What a marvellous Victory!";
            document.getElementById("update").innerHTML = "&#9996;";
        }
        else if (results[0].label == "Hug"){
            speak_data = "Give me a nice Hug!";
            document.getElementById("update").innerHTML = "&#128080;";
        }
        else if(results[0].label == "Swag"){
            speak_data = "You have so much swag!";
            document.getElementById("update").innerHTML = "&#129304;";
        }
        speak();
    }
}