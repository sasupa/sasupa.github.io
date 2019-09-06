console.log("Hello again world!")

// Tää funktio tarkastaa login sivulle syötetyt arvot
function check(form) {
 if(form.userid.value == "myuserid" && form.pswrd.value == "mypswrd")
  {
    window.open('dashboard.html') //opens the target page while Id & password matches
  }
 else
 {
   alert("Error Password or Username") //displays error message
  }
}