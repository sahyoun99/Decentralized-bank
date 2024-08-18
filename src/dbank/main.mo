import Debug "mo:base/Debug"; // to print
import Time = "mo:base/Time";
import Float "mo:base/Float"; // float 


actor DBank {

stable var currentValue: Float = 300; // how much money is inside the bank
currentValue:= 300;
Debug.print (debug_show(currentValue));

stable var startTime = Time.now(); // gives us nano seconds since 1970-1-1
Debug.print (debug_show(startTime));

Debug.print(debug_show(startTime));
// add to value 
 public func topUp(amount:Float ){ // any positive num
  currentValue +=amount;
  Debug.print(debug_show(currentValue));
 };

//function to withdraw
public func withdraw(amount:Float){

  let temp: Float = currentValue - amount;
  if(temp >=0){
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
  }
  else{
    Debug.print("cant withdraw and have a negative amount");
  }

};

//query balance
public query func checkBalance(): async Float { 
  return currentValue;
};

// compount interest function ( not realistic but same logic)
public func compound() {
  let currentTime = Time.now();// current time 
  let timeElapsedNS =  currentTime -startTime;
  let timeElapsedS = timeElapsedNS /1000000000; // converting time elapsed to seconds 

  currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS)); // compount entrest formula , used 
  startTime:= currentTime;
}

}