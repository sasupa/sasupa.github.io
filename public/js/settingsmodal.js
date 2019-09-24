console.log("Tämä tulee settingsmodal.js")
const nimi = document.querySelector("#nimi")
const email = document.querySelector("#email")
const role = document.querySelector("#role")

fetch("/users/5d8963568a9939a1e3da5eed").then((response) => {
    response.json().then((data) => {
        console.log(data.name)
        nimi.textContent = data.name
        email.textContent = data.email
        role.textContent = data.role
    })
})

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