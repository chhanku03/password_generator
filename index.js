const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#number");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generatepassword");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols='~`!@#$%^&*()_-+={}[];:"|\/?<>,.';
let password="";
let passwordLength=10;
let checkCount=1;
handleSlider();
function handleSlider()
{
  inputSlider.value=passwordLength;
  lengthDisplay.innerText=passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundcolor=color;
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
 
function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbols(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt[randNum];
}