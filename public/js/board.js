const rahaButton = document.getElementById("raha")
const kalButton = document.getElementById("kal")
const keikatButton = document.getElementById("keikat")
const kuvatButton = document.getElementById("kuvat")
const pipeButton = document.getElementById("pipeline")

const BoxOnOff = (button, key) => {
    var box = document.getElementById(key)
    var status = localStorage.getItem(key)

    if (status === "false" || status === null) {
        box.hidden = false
        button.className = "btn btn-success btn-sm"
        localStorage.setItem(key, true)
    } else {
        box.hidden = true
        button.className = "btn btn-info btn-sm"
        localStorage.setItem(key, false)
    }
}

// Tarkastetaan mitkä boxit on valittu tällä istunnolla
const viewCheckedBoxes = () => {
    keyArray = ["rahaBox", "kalBox", "keikatBox", "kuvatBox", "pipeBox"]
    buttonArray = [rahaButton, kalButton, keikatButton, kuvatButton, pipeButton]
    var count = 0

    keyArray.forEach((key) => {
        var status = localStorage.getItem(key)
        if (status === "false" || status === null) {
            document.getElementById(key).hidden = true
            count = count + 1
        } else {
            document.getElementById(key).hidden = false
            buttonArray[count].className = "btn btn-success btn-sm"
            count = count + 1
        }
    })
}
viewCheckedBoxes()

// Boxien näkyvyys
rahaButton.addEventListener('click', function (e) {
    BoxOnOff(rahaButton, "rahaBox")
});

kalButton.addEventListener('click', function (e) {
    BoxOnOff(kalButton, "kalBox")
});

kuvatButton.addEventListener('click', function (e) {
    BoxOnOff(kuvatButton, "kuvatBox")
});

keikatButton.addEventListener('click', function (e) {
    BoxOnOff(keikatButton, "keikatBox")
});

pipeButton.addEventListener('click', function (e) {
    BoxOnOff(pipeButton, "pipeBox")
});

// Asetusten ikkuna = modal avaaminen ja sulkeminen - asetuksille oma settingsmodal.js
// Get elements
var settingsModal = document.getElementById("settings");
var settingsButton = document.getElementById("profiili");
var closeAction = document.getElementsByClassName("close")[0];

openModal = (modal, button) => {
    modal.style.display = "block";
    button.className = "btn btn-dark btn-sm"
}

closeModal = (modal, button) => {
    modal.style.display = "none";
    button.className = "btn btn-light btn-sm"
}

// When the user clicks on the settings button, open the modal
settingsButton.onclick = function() {
    console.log("Nappia painettu")
    console.log(settingsModal.style.display)
    if (settingsModal.style.display == "block") {
        closeModal(settingsModal, settingsButton)
    } else {
    openModal(settingsModal, settingsButton)
    }
}

// Close the modal from button
closeAction.onclick = function() {
    closeModal(settingsModal, settingsButton)
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == settingsModal) {
        closeModal(settingsModal, settingsButton)
    }
  }


  // Uloskirjautumisen funktio
document.querySelector("#logout").addEventListener('click', function (e) {
    window.open('/', "_self") //vie suoraan etusivulle, jossa loggedIn vaihtuu falseksi
});