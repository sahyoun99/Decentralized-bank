import { UpdateCallRejectedError } from "@dfinity/agent";
import { dbank } from "../../declarations/dbank"; // this file basically contain refrences to our functions in a way js can undesratnd them



  // whenever the page loads 
 window.addEventListener("load", async function() { // trigger each time page is laoded
  update();});
// to manipulate events within the form 
//"form" is an html element not an id 
// submit is a type of input ( button)
document.querySelector("form").addEventListener("submit", async function (event){
  
  event.preventDefault(); // to prevent automatic refresh
  const button = event.target.querySelector("#submit-btn")

  const input = parseFloat(document.getElementById("input-amount").value); // get the value entered in input-amount textField
  const output =parseFloat(document.getElementById("withdrawal-amount").value); // get the value entered in withdrawl-amount textField


  button.setAttribute("disabled",true); // disable the button until updates on th ebalance are made
  
  // check if input or withdrawl and perform it
  if(document.getElementById("input-amount").value.length != 0 ){
    await dbank.topUp(input);
  }
  else if(document.getElementById("withdrawal-amount").value.length != 0 ){
    await dbank.withdraw(output);
  }

  // update balance
  update();
  
  // set both text fields back to empty
  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawl-amount").value = "";
  
  //enable the button again
  button.removeAttribute("disabled");


})
async function update(){
const currentValue = await dbank.checkBalance(); // await for the result 
 document.getElementById("value").innerText= Math.round(currentValue * 100)/100;
}