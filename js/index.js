// Aina kun index.html avataan, niin varmistetaan että sivu ymmärtää ettei kukaan ole vielä kirjautunut
localStorage.setItem("loggedIn", false)
localStorage.removeItem("userId")

// Testaan saanko process.env. toimimaan
var testVAR = process.env.TEST;
console.log(testVAR)

// Tää funktio tarkastaa login sivulle syötetyt arvot
function check(form) {
 if(form.userid.value == "myuserid" && form.pswrd.value == "mypswrd")
  {
    localStorage.setItem("loggedIn", true) // kun käyttäjätunnus ja salasana on oikein, jätetään tieto että on kirjautunut sisään
    localStorage.setItem("userId", form.userid.value)
    window.open('dashboard', "_self") //opens the target page while Id & password matches
  }
 else
 {
   alert("Error Password or Username") //displays error message
  }
}


/* Tied to "Sign up" button. Sends you to the sign-up form. */ 

const signUpPage = () => {
    window.open('signUpBoard')
  };



/* This function is tied to the eventListener on the signUpBoard form. It saves the data,
and calls an object creator amidst doing that. Rautalankamalli, koska ei holdaa 
kuin yhden käyttäjän toistaiseksi. Useampi käyttäjä vaatii datamallin ja classin methodeille. */

const persistData = (form) => {
  const uName = form.username.value;
  const uPasw = form.password.value;
  const item =  makeItem(uName, uPasw);
  //console.log(item); for debugging purposes

  //To make sure there is an item to persist
  if (item) {
    localStorage.setItem('userData', JSON.stringify(item));
    
  } else {
    console.log(error)
  }

};

/* Function that makes the user object. Separate function to keep
our code clean and maintainable. */

const makeItem = (name, passw) => {
  const newItem = { 
    userId: name, 
    passw: '/// TÄHÄN HASH OIKEASTI ///' + ' ' + passw, 
    number: Math.round(Math.random() * 10) //Tää vaan testinä. Pitäs integroida ulkonen kirjasto, mut en saanut sitä toimii oikkien takia.
  }
  return newItem;
};


/* Clear the fields after you click the button to show something is happening after the click. Works now only with signUp page
because elements are named with "username" & password instead of "userid" or "pswrd" */

const clearForm = (form) => {
  form.username.value = '';
  form.password.value = '';
};


/* EVENT LISTENER: Siirtyminen signup-sivulta dashboard-näkymään. Koska koodi on
on purkkapaikkaa ja patenttia, on vaikea siirtää tän funktion userID:tä dashin 
näkymään niin, että se tunnistais uuden käyttäjän ja piirtäis muuna kuin "Nyt kirjautuneena: undefined".

Ehdotus:
1) Luodaan views-filet, jossa generoidaan HTML:ää ja manipuloidaan domia koordinoidusti. Esim
Dashboardin näkymä oikeilla tiedoilla. Sit eventlistenerit controlleriin (index.js), ei HTML:ään kuten nyt (onclick).

2) Hajautetaan CSS ja DOM-elementit omiin filuihin. VRT. se Base-file harkkaprojektissa.

3) Opetellaan toi DOM-elementtien nimeäminen. Niitä voi kontrolloida monella tapaa: ID:llä, nimellä, tai
classilla. En tiedä mikä on paras. Itse käytän aina classia.

*/


const signUpBtn = document.querySelector('.kliksautus');


if (signUpBtn) {


  signUpBtn.addEventListener('click', e => {
    const userId = document.querySelector('.nimi').value;
   
   
    localStorage.setItem("loggedIn", true) // kun käyttäjätunnus ja salasana on oikein, jätetään tieto että on kirjautunut sisään
    localStorage.setItem("userId", userId)
    window.open('dashboard') // Tähän pitäs jotenkin saada syötettyä kama, et DOMiin menis uuden userin tiedot; localStorageen ne tallentuu oikein.
    
  

    console.log(localStorage);
  })};

