import { login } from "./auth.js"

const formLogin= document.getElementById("formLogin")

formLogin.addEventListener("submit",async (e)=>{
    e.preventDefault()
    const inputEmail=document.getElementById("email")
    const inputPass=document.getElementById("password")
    const response={email:inputEmail.value, password_hash:password.value}
    console.log(response)
    await login(response)
})