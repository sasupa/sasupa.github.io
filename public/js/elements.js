const signIn = document.getElementById("signIn")
const inputEmail = document.getElementById("inputEmail")
const inputPassword = document.getElementById("inputPassword")
const rememberMe = document.getElementById("rememberMe")

// Tämä testaa vain että inputit login-sivun formista tulee oikein
signIn.addEventListener("submit", e => {
    e.preventDefault()
    console.log(inputEmail.value)
    console.log(inputPassword.value)
    console.log(rememberMe.checked)
})
