import "https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"
import "https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js"
import "https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js" 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB5pn8-YpeZn14oCz7Ykubyujw6IS-uU9Q",
    authDomain: "smart-parking-88ddf.firebaseapp.com",
    databaseURL: "https://smart-parking-88ddf-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smart-parking-88ddf",
    storageBucket: "smart-parking-88ddf.appspot.com",
    messagingSenderId: "721183918726",
    appId: "1:721183918726:web:ac0b8f1c17dcb344839f07"
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  console.log(app);



//signup
window.onload=function(){
  document.getElementById("register").addEventListener("click", function() {
    event.preventDefault() ;
      var email =  document.getElementById("email").value;
      var name = document.getElementById("name").value;
      var password = document.getElementById("password").value;
      //For new registration
      createUserWithEmailAndPassword(auth,email, password , name)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        alert("Registration successfull!!");
        window.location.assign('/home') ;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
        alert(error);
      });		  		  
  });
}



//signin
window.onload=function(){
document.getElementById("login").addEventListener("click", function() {
    var email =  document.getElementById("login_email").value;
    var password = document.getElementById("login_password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      alert(user.email+" Login successfully!!!");
      window.location.assign('/home')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });		  		  
});
}




//slot
// var database = firebase.database() ;
//   var dataRef1 = database.ref('slots/int') ;
//   var dataRef2 = database.ref('slots/int2') ;
//   var dataRef3 = database.ref('slots/int3') ;
//   var bookingsRef = database.ref("bookings");

// window.onload=function(){
//   dataRef1.on('value', function(getdata1){
// 	  	var status1 = getdata1.val();
//       if(status1==1)
// 	  	{document.getElementById('sensorvalue').innerHTML = "empty" ;}
//       if(status1==0)
// 	  	{document.getElementById('sensorvalue').innerHTML = "full" ;}
// 	  })
//   dataRef2.on('value', function(getdata2){
// 	  	var status2 = getdata2.val();
//       if(status2==1)
// 	  	{document.getElementById('sensorvalue2').innerHTML = "empty" ;}

//       if(status2==0)
// 	  	{document.getElementById('sensorvalue2').innerHTML = "full" ;}
// 	  })
//   dataRef3.on('value', function(getdata3){
// 	  	var status3 = getdata3.val();
//       if(status3==1)
// 	  	{document.getElementById('sensorvalue3').innerHTML = "empty" ;}

//       if(status3==0)
// 	  	{document.getElementById('sensorvalue3').innerHTML = "full" ;}
// 	  })
// }
 

// document.addEventListener("DOMContentLoaded", function() {
// document.getElementById("bookingForm").addEventListener("submit", function(event) {
//         event.preventDefault();
//         var name = document.getElementById("name").value;
//         var email = document.getElementById("email").value;
//         var slot = document.getElementById("slot").value;
  
//         if (name && email && slot) {
//           // Check if the slot is already booked
//           bookingsRef.once("value", function(snapshot) {
//             var bookings = snapshot.val();
//             var isSlotAvailable = true;
//             if (bookings) {
//               Object.values(bookings).forEach(function(booking) {
//                 if (booking.slot === slot) {
//                   isSlotAvailable = false;
//                 }
//                   // setTimeout(function() {
//                     //  isSlotAvailable = true ;
//                       //console.log("slot free") ;
//                   //},5000) ;
//               });
//             }
//             if (isSlotAvailable) {
//               // Book the slot
//               var newBookingRef = bookingsRef.push();
//               newBookingRef.set({
//                 name: name,
//                 email: email,
//                 slot: slot
//               }).then(function() {
//                 alert("Slot booked successfully!");

//                 if(slot === "A"){
//         console.log("slot free") ;
//         document.getElementById('book1').innerHTML="booked" ;}
//     if(slot === "B")
//     {document.getElementById('book2').innerHTML="booked" ;}
//     if(slot === "C")
//     {document.getElementById('book3').innerHTML="booked" ;}
//                 document.getElementById("name").value = "";
//                 document.getElementById("email").value = "";
//                 document.getElementById("slot").value = "";
//               }).catch(function(error) {
//                 console.error("Error saving booking:", error);
//               });
//             } 
//             else { alert("This slot is already booked. Please choose another slot.");
//             if(slot === "A")
//               {  document.getElementById('book1').innerHTML="booked" ;}
//               if(slot === "B")
//             {document.getElementById('book2').innerHTML="booked" ;}
//              if(slot === "C")
//             {document.getElementById('book3').innerHTML="booked" ;}
//              }
                  
//           });
//         } else {
//           alert("Please fill in all the fields.");
//         }
//       });
//     });
     