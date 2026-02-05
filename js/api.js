export async function getAll() {
    try {
        const respuesta = await fetch('https://cynical-uninvestable-noble.ngrok-free.dev/all', {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        });
        const json = await respuesta.json();
        return json
    } catch (error) {
        return error
    }
}

export async function mount() {
    try {
        const respuesta = await fetch('https://cynical-uninvestable-noble.ngrok-free.dev/mount', {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        });
        const json = await respuesta.json();
        return json
    } catch (error) {
        return error
    }
}

export async function create(datosPresupuesto) { // Recibe los datos como argumento
    try {
        const respuesta = await fetch('https://cynical-uninvestable-noble.ngrok-free.dev/create', {
            method: 'POST', // Especificamos el método
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true"// Indicamos que enviamos un JSON
            },
            body: JSON.stringify(datosPresupuesto) // Convertimos el objeto JS a string JSON
        });

        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const json = await respuesta.json();
        console.log('Respuesta exitosa:', json);
        return json;

    } catch (error) {
        console.error('Hubo un fallo en la petición POST:', error);
    }
}

export async function setdate(datosPresupuesto) {
    try {
        const respuesta = await fetch('https://cynical-uninvestable-noble.ngrok-free.dev/setdate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify(datosPresupuesto)
        });

        // 1. Verificamos si la respuesta es correcta antes de leer el cuerpo
        if (!respuesta.ok) {
            const errorData = await respuesta.json(); // Leemos el error si falla
            throw new Error(errorData.message || 'Error en el servidor');
        }

        // 2. Leemos el JSON UNA SOLA VEZ
        const data = await respuesta.json();

        // 3. Usamos los datos
        console.log('Respuesta exitosa:', data);
        
        // Retornamos la data para que create.js pueda usar el id_presupuesto
        return data; 

    } catch (error) {
        console.error('Hubo un fallo en la petición POST:', error);
        throw error; // Re-lanzamos para que el formulario sepa que falló
    }
}

export async function update(datosPresupuesto) {
    try {
        const respuesta = await fetch(`https://cynical-uninvestable-noble.ngrok-free.dev/update/${datosPresupuesto.id_item}`, {
            method: 'PATCH', // Especificamos el método
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true"// Indicamos que enviamos un JSON
            },
            body: JSON.stringify(datosPresupuesto) // Convertimos el objeto JS a string JSON
        });

        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        const json = await respuesta.json();
        console.log('Respuesta exitosa:', json);
        return json;
    } catch (error) {
        console.log(error);
    }
}


export async function deleted(idItem){
    try {
        const respuesta = await fetch(`https://cynical-uninvestable-noble.ngrok-free.dev/deleted/${idItem}`, {
            method: 'DELETE', // Especificamos el método
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true"// Indicamos que enviamos un JSON
            }
        });
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        console.log(`Elemento ${idItem} eliminado con éxito`);
    } catch (error) {
        console.log(error);
    }
}
