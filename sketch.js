// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */
const image = document.getElementById('image');
const fileInput = document.getElementById('fileUploader');
const status = document.getElementById('status');
const result = document.getElementById('result'); // The result tag in the HTML
const probability = document.getElementById('probability'); // The probability tag in the HTML

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
const classifier = ml5.imageClassifier('MobileNet', modelReady);

// A variable to hold the image we want to classify
let img;

function handleFiles() {
  const curFiles = fileInput.files;
  if (curFiles.length === 0) {
    image.src = 'images/bird.jpg';
    setTimeout(imageReady, 100);
  } else {
    image.src = window.URL.createObjectURL(curFiles[0]);
    setTimeout(imageReady, 100);
  } 
  
}

function clickUploader() {
  fileInput.click();
}

/*
function setup() {
  noCanvas();
  // Load the image
  img = createImg('images/bird.jpg', imageReady);
  img.size(400, 400);
}
*/

// Change the status when the model loads.
function modelReady(){
  status.innerHTML = "model loaded";
  imageReady();
}

// When the image has been loaded,
// get a prediction for that image
function imageReady() {
  classifier.predict(image, gotResult);
  // You can also specify the amount of classes you want
  // classifier.predict(img, 10, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(err, results) {
  // Display error in the console
  if (err) {
    console.error(err);
  }
  // The results are in an array ordered by probability.
  result.innerHTML = results[0].className;
  probability.innerHTML = probresults[0].probability;
}
