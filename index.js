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
let checkCount=0;
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

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;

    if(hasUpper && hasLower && (hasNum||hasSym)&& passwordLength>=8)
    {
        setIndicator("#0f0");
    }
    else if ((hasLower||hasUpper)&&(hasNum||hasSym)&&passwordLength>=6)
    {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
}

async function copyContent()
{  try
    {
   await navigator.clipboard.writeText(passwordDisplay.value);
   copyMsg.innerText="copied";
    }
    catch(e)
    {
        copyMsg.innerText="failed";
    }

    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);

}
  function shufflepassword(array)

  {
      for(let i=array.length-1; i>0; i--)
      {
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
      }
       let str="";
       array.forEach((el)=>(str +=el));
       return str;

  }
function handlecheckboxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    });

    if(passwordLength<checkCount)
       {
        passwordLength=checkCount;
        handleSlider();
       }

}
 
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxChange);
})

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click',()=>{
    if(checkCount<=0) return;
    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }
  
    password="";

    /*if(uppercaseCheck.checked)
    {
        password+=generateUppercase();
    }
     
    if(lowercaseCheck.checked)
    {
        password+=generateLowercase();
    }
    if(numbersCheck.checked)
    {
        password+=generateRandomNumber();
    }
    if(symbolsCheck.checked)
    {
        password+=generateSymbols();
    }
*/
     let funcArr=[];

     if(uppercaseCheck.checked)
      funcArr.push(generateUppercase);
    if(lowercaseCheck.checked)
       funcArr.push(generateLowercase);
    if(numbersCheck.checked)
      funcArr.push(generateRandomNumber);
    if(symbolsCheck.checked)
     funcArr.push(generateSymbols);

     for(let i=0; i<funcArr.length; i++)
     {
        password+=funcArr[i]();
     }

     //remaining password
     for(let i=0; i<passwordLength-funcArr.length; i++)
     {
        let randIndex=getRndInteger(0,funcArr.length);
        password+=funcArr[randIndex]();
     }
     //suffule the password
     password=shufflepassword(Array.from(password));
     passwordDisplay.value=password;
     //calculate strength
     calcStrength();
      


})


