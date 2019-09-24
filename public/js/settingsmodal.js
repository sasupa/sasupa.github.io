const nimi = document.querySelector("#nimi")
const email = document.querySelector("#email")
const role = document.querySelector("#role")

fetch("/users/5d8963568a9939a1e3da5eed").then((response) => {
    response.json().then((data) => {
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