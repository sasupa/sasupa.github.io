console.log("Hello again world!")
// Aina kun index.html avataan, niin varmistetaan että sivu ymmärtää ettei kukaan ole vielä kirjautunut
localStorage.setItem("loggedIn", false)

// Tää funktio tarkastaa login sivulle syötetyt arvot
function check(form) {
 if(form.userid.value == "myuserid" && form.pswrd.value == "mypswrd")
  {
    localStorage.setItem("loggedIn", true) // kun käyttäjätunnus ja salasana on oikein, jätetään tieto että on kirjautunut sisään
    window.open('dashboard.html', "_self") //opens the target page while Id & password matches
  }
 else
 {
   alert("Error Password or Username") //displays error message
  }
}