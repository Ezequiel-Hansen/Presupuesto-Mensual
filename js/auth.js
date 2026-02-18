export async function login(data) {
    try {
        const respuesta = await fetch('https://cynical-uninvestable-noble.ngrok-free.dev/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify(data)
        });
        const token= await respuesta.json()
        localStorage.setItem("token",token.token)
        
    } catch (error) {
        console.log(error)
    }
}

export async function register(data) {
    try {
        const respuesta = await fetch('https://cynical-uninvestable-noble.ngrok-free.dev/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify(data)
        });
        
    } catch (error) {
        console.log(error)
    }
}
