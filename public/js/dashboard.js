let loggedIn = localStorage.getItem("loggedIn")
let userId = localStorage.getItem("userId")

// Ehdollinen populointi, userId muodostuu localStorageen vasta kun kirjatuu sisään, muuten arvo on null
if (userId === null) {
    document.querySelector("#status").innerHTML = `Et ole kirjautunut sisään :(`
    
    // Tästä eteenpäin populoidaan henkilökohtaiset tiedot

} else {
    document.querySelector("#status").innerHTML = `Nyt kirjautuneena: ${userId}`
    document.querySelector("#iframe").innerHTML = '<iframe src="https://calendar.google.com/calendar/embed?src=b2codsr2nsdl74vbp3iman6scg%40group.calendar.google.com&ctz=Europe%2FHelsinki" style="border: 0" width="600" height="400" frameborder="0" scrolling="no"></iframe>'
}

// Uloskirjautumisen funktio
document.querySelector("#logout").addEventListener('click', function (e) {
    localStorage.removeItem("userId")
    window.open('index.html', "_self") //vie suoraan etusivulle, jossa loggedIn vaihtuu falseksi
});

console.log("Tämä tulee dashboard.js filusta")