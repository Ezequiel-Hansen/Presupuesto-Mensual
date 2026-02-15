import { register } from "./auth.js"

const formLogin= document.getElementById("formLogin")

formLogin.addEventListener("submit",async (e)=>{
    e.preventDefault()
    const inputEmail=document.getElementById("email")
    const inputPass=document.getElementById("password")
    const inputName=document.getElementById("name")
    const response={email:inputEmail.value, password_hash:inputPass.value, name:inputName.value}
    await register(response)

})