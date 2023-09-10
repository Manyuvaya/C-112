var prediction1=""
var prediction2=""

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:100
})

camera=document.getElementById("camera")
Webcam.attach("#camera")

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='img'src='"+data_uri+"'/>"
    })
        
}
console.log(ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/eMKOfCTZ9/model.json",modelLoaded)
function modelLoaded(){
    console.log('modelLoaded')
}
function speak(){
    var synth=window.speechSynthesis;
    var speak_data1="the first prediction is"+prediction1
    var speak_data2="the second prediction is"+prediction2
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2)
    synth.speak(utterThis)
}
function check(){
  img=document.getElementById("img")  
    classifier.classify(img,got_result)
    
}
function got_result(error,results){
if(error){
    console.log(error)
}
else{
    console.log(results)
    document.getElementById("prediction_1").innerHTML=results[0].label
    document.getElementById("prediction_2").innerHTML=results[1].label
    prediction1=results[0].label
    prediction2=results[1].label
    speak()
    if(results[0].label=="Happy"){
      document.getElementById("emoji_1").innerHTML="&#128522"

    }
    if(results[0].label=="Sad"){
        document.getElementById("emoji_1").innerHTML="&#128532"
    }
    if(results[0].label=="Angry"){
        document.getElementById("emoji_1").innerHTML="&#128548"
    }
    if(results[1].label=="Happy"){
        document.getElementById("emoji_2").innerHTML="&#128522"
    }
    if(result[1].label=="Sad"){
        document.getElementById("emoji_2").innerHTML="&#128532"
    }
    if(result[1].label=="Angry"){
        document.getElementById("emoji_2").innerHTML="&#128548"
    }

}
}