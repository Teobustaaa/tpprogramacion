const nombreInput = document.getElementById("nombreContacto");
                const mensajeNombre = document.getElementById("mensaje-nombre");

                nombreInput.addEventListener("input", () => {
                        if(nombreInput.value.length < 5) {
                            mensajeNombre.textContent = "El nombre debe tener al menos 5 letras";
                            mensajeNombre.style.color = "red";
                        } else {
                            mensajeNombre.textContent = "Nombre validado.";
                            mensajeNombre.style.color = "green";
                        }
                    }
                );

                const correoEmail = document.getElementById("mail");
                const mensajeEmail = document.getElementById("mensaje-email");

                correoEmail.addEventListener("input", () => {
                    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!regexEmail.test(correoEmail.value)) {
                        mensajeEmail.textContent = "Email validado.";
                        mensajeEmail.style.color = "green";
                    } else {
                        mensajeEmail.textContent = "El email debe contener @ y al menos 6 caracteres.";
                        mensajeEmail.style.color = "red";
                    }
                });

                const telefonoInput = document.getElementById("telefono");
                const mensajeTelefono = document.getElementById("mensaje-telefono");

                telefonoInput.addEventListener("input", () =>{
                    if(telefonoInput.value.length < 6) {
                        mensajeTelefono.textContent = "Numero de telefono invalido";
                        mensajeTelefono.style.color = "red";
                    } else {
                        mensajeTelefono.textContent = "Numero de telefono valido";
                        mensajeTelefono.style.color = "green";
                    }

                })

                const mensajeInput = document.getElementById("mensaje");
                const mensajeMensaje = document.getElementById("mensaje-mensaje");

                mensajeInput.addEventListener("input", () =>{
                    if(mensajeInput.value.trim().length < 5) {
                        mensajeMensaje.textContent = "El mensaje debe contener mas de 5 caracteres";
                        mensajeMensaje.style.color = "red";
                    } else {
                        mensajeMensaje.textContent = "Mensaje validado.";
                        mensajeMensaje.style.color = "green";
                    }
                })

                const checkInput = document.getElementById("acepto");
                const checkMensaje = document.getElementById("mensaje-check");

                checkInput.addEventListener("change", () => {
                    if(checkInput.checked === false) {
                        checkMensaje.textContent = "Debes aceptar que te contacten.";
                        checkMensaje.style.color = "red";
                    } else {
                        checkMensaje.textContent = "Aceptado";
                        checkMensaje.style.color = "green";
                    }
                } )


                formulario.addEventListener("submit", async (e) => { //async: función que puede esperar cosas que tardan en completarse (submit con fetch)
                    e.preventDefault(); //Evita que se recargue la pagina

                    const datos = {
                        nombre: nombreInput.value,
                        email: correoEmail.value,
                        telefono: telefonoInput.value,
                        mensaje: mensajeInput.value
                    };

                    try { //si falla try, se capta el error con catch
                        const res = await fetch("https://jsonplaceholder.typicode.com/posts", { //await: espera a que la API responda antes de continuar; se define una constante de respuesta donde se guarda la respuesta del servidor (si estan "bien" o "mal" los datos enviados)
                            method: "POST", //enviamos datos al servidor (mock API)
                            headers: { "Content-Type": "application/json" }, //los headers son informacion adicional para que el servidor pueda interpretar la informacion (enviamos info en formato json en este caso)
                            body: JSON.stringify(datos) //el contenido que enviamos al servidor (datos en formato json)
                        });

                        const data = await res.json(); //await res.json lee el cuerpo de la respuesta (que viene en JSON) y lo convierte en un objeto js, para que data(objeto) pueda acceder a sus propiedades (data.nombre, data.email etc)
                        alert("Formulario enviado: " + JSON.stringify(data)); //se pasa a data como string porque alert muestra texto, y se envia el formulario a un mock

                    } catch (error) { //recibe la info sobre lo que salio mal 
                        alert("Error al enviar: " + error);
                    }
                });
