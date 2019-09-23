//Korjaa tää etsimään usereista nimi ja täytä settingsmodaliin
// fetch("/weather?address=" + location).then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             msg1.textContent = data.error
//         }
//     })
// })

const nimiForm = document.getElementById("form1")
var uusiNimi = document.getElementById("uusiNimi").value

nimiForm.addEventListener("submit", (e) => {
    e.preventDefault()

})

// Tässä malliksi weather fetch pyyntö
// const weatherForm = document.querySelector("form")
// const search = document.querySelector("input")
// const msg1 = document.querySelector("#msg1")
// const msg2 = document.querySelector("#msg2")




// weatherForm.addEventListener("submit", (e) => {
//     msg2.textContent = ""
//     e.preventDefault()

//     const location = search.value
//     msg1.textContent = "Katsotaanpa tuon paikan sää..."

//     fetch("/weather?address=" + location).then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             msg1.textContent = data.error
//         } else {
//             msg1.textContent = data.location
//             msg2.textContent = data.forecast
//         }
//     })
// })