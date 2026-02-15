export async function login(data) {
    try {
        const respuesta = await fetch('http://localhost:4000/auth/login', {
            method: 'POST', // Especificamos el método
            headers: {
                'Content-Type': 'application/json',
                //"ngrok-skip-browser-warning": "true"// Indicamos que enviamos un JSON
            },
            body: JSON.stringify(data) // Convertimos el objeto JS a string JSON
        });
        const token= await respuesta.json()
        localStorage.setItem("token",token.token)
        
    } catch (error) {
        console.log(error)
    }
}

export async function register(data) {
    try {
        const respuesta = await fetch('http://localhost:4000/auth/register', {
            method: 'POST', // Especificamos el método
            headers: {
                'Content-Type': 'application/json',
                //"ngrok-skip-browser-warning": "true"// Indicamos que enviamos un JSON
            },
            body: JSON.stringify(data) // Convertimos el objeto JS a string JSON
        });
        
    } catch (error) {
        console.log(error)
    }
}