console.log("Tämä tulee board.js filusta")

// Uloskirjautumisen funktio
document.querySelector("#logout").addEventListener('click', function (e) {
    window.open('/', "_self") //vie suoraan etusivulle, jossa loggedIn vaihtuu falseksi
});

// Rahaboxin näkyvyys
document.querySelector("#raha").addEventListener('click', function (e) {

    if (document.getElementById("rahaboxi").hidden) {
        document.getElementById("rahaboxi").hidden = false
    } else {
        document.getElementById("rahaboxi").hidden = true
    }
});

// Kalenterin näkyvyys
document.querySelector("#kal").addEventListener('click', function (e) {
    if (document.getElementById("kalenteri").hidden) {
        document.getElementById("kalenteri").hidden = false
    } else {
        document.getElementById("kalenteri").hidden = true
    }
});

// Keikkojen näkyvyys
document.querySelector("#keikat").addEventListener('click', function (e) {
    if (document.getElementById("keikkalista").hidden) {
        document.getElementById("keikkalista").hidden = false
    } else {
        document.getElementById("keikkalista").hidden = true
    }
});