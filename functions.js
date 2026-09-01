// Funcion para registrar un único usuario
function registrarUsuario(nombre, contraseña, saldo) {
    const usuario = { nombre, contraseña, saldo: parseInt(saldo) };

    localStorage.setItem('usuario', JSON.stringify(usuario));
}
/*

// Registro de usuario
const nombre = prompt("Ingrese un nombre de usuario para registrarse: ");
const contraseña = prompt("Ingrese una contraseña para tu usuario: ");
const saldo = prompt("Ingrese saldo inicial para tu cuenta: ");

*/

/*

registrarUsuario(nombre, contraseña, saldo);
console.log("Usuario registrado");

*/


// Función para validar el usuario
function validarUsuario(nombreIngresado, contraseñaIngresada) {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario == null) {
        return false;
    }

    if (usuario.nombre === nombreIngresado && usuario.contraseña === contraseñaIngresada) {
        return true;
    } else {
        return false;
    }
}


// Función para registrar una transacción en el historial
function registrarTransaccion(nombreUsuario, tipo, monto, detalle = "") {
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];

    transacciones.push({ nombreUsuario, tipo, monto, detalle, fecha: new Date().toLocaleString() });

    localStorage.setItem('transacciones', JSON.stringify(transacciones));
}


// Función para consultar las transacciones de un usuario
function consultarTransacciones(usuarioActual) {
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];

    const transaccionesPropias = transacciones.filter(t => t.nombreUsuario === usuarioActual.nombre);

    if (transaccionesPropias.length === 0) {
        console.log("No tienes transacciones registradas todavía.");
        return;
    }

    prompt(`Historial de transacciones de ${usuarioActual.nombre}:
                presiona enter para continuar`);

    transaccionesPropias.forEach(t => { console.log(`[${t.fecha}] ${t.tipo}: ${t.monto} ${t.detalle ? t.detalle : ""}`); });
}


// Función para retirar dinero
function retirarDinero(usuarioActual) {

    const valorRetirar = Number(prompt("¿Cuanto desea retirar?"));

    if (valorRetirar > 0) {
        if (usuarioActual.saldo >= valorRetirar) {

            usuarioActual.saldo -= valorRetirar;

            localStorage.setItem('usuario', JSON.stringify(usuarioActual));

            registrarTransaccion(usuarioActual.nombre, "Retiro", valorRetirar);
            prompt(`Retiraste ${valorRetirar}, tu nuevo saldo es de: ${usuarioActual.saldo}
                    
                                    Presiona enter para continuar`);
        }
        else if (usuarioActual.saldo < valorRetirar) {
            prompt(`Saldo insuficiente. Tu saldo es de: ${usuarioActual.saldo}
                                    Presiona enter para continuar`);
        }
    } else if (valorRetirar <= 0) {
        prompt("Ingrese un valor mayor a 0 para retirar")
    } else {
        const valorRetirar = prompt(`Dato no válido`);
    }


}


// Función para consignar dinero
function consignarDinero(usuarioActual) {

    const valorConsignar = parseInt(prompt("¿Cuánto desea consignar?"));

    if (valorConsignar > 0) {
        usuarioActual.saldo += valorConsignar;

        localStorage.setItem('usuario', JSON.stringify(usuarioActual));

        registrarTransaccion(usuarioActual.nombre, "Consignación", valorConsignar);

        prompt(`Consignaste ${valorConsignar}, tu nuevo saldo es de: ${usuarioActual.saldo}
                                Presiona enter para continuar`);
    } else if (valorConsignar <= 0) {
        prompt("El valor de una consignación debe de ser mayor a 1");
    }


}


// Consultar balance
function consultarBalance(usuarioActual) {
    prompt(`Dinero disponible es de: ${usuarioActual.saldo}
        
                Presiona enter para continuar`)
}


/*
menuCajero(usuarioActual){
    let continuar = true;

    while (continuar) {


                    const opcion = Number(prompt(`                                          ¿Qué deseas hacer?

                        1. Consultar balance            2. retirar.
                        3. consignar                        4. Consultar transacciones
                                                5. Salir`));

                    if (opcion === 1) {
                        consultarBalance(usuarioActual);
                    } else if (opcion === 2) {
                        retirarDinero(usuarioActual);
                    } else if (opcion === 3) {
                        consignarDinero(usuarioActual);
                    } else if (opcion === 4) {
                        consultarTransacciones(usuarioActual);
                    } else if (opcion === 5) {
                        console.log("Saliste del programa, esperamos verte pronto");
                        continuar = false;
                        return continuar;
                    }
                }
}
*/

// Menú inicio de sesión
function menuInicioSesion() {

// ¿Esta registrado?    
let estasRegistrado = Number(prompt("Escribe 1 si estas registrado o 2 para registrarte: "));
    if (estasRegistrado === 1) {
        for (let i = 0; i < 3; i++) {
            const nombreIngresado = prompt("Ingresa tu usuario: ");
            const contraseñaIngresada = prompt("Ingresa tu contraseña: ");

            if (validarUsuario(nombreIngresado, contraseñaIngresada)) {
                console.log("Inicio de sesion correcto");

                const usuarioActual = JSON.parse(localStorage.getItem('usuario'));

                let continuar = true;

                while (continuar) {


                    const opcion = Number(prompt(`                                          ¿Qué deseas hacer?

                        1. Consultar balance            2. retirar.
                        3. consignar                        4. Consultar transacciones
                                                5. Salir`));

                    if (opcion === 1) {
                        consultarBalance(usuarioActual);
                    } else if (opcion === 2) {
                        retirarDinero(usuarioActual);
                    } else if (opcion === 3) {
                        consignarDinero(usuarioActual);
                    } else if (opcion === 4) {
                        consultarTransacciones(usuarioActual);
                    } else if (opcion === 5) {
                        console.log("Saliste del programa, esperamos verte pronto");
                        continuar = false;
                        return continuar;
                    }
                }
            } else {
                console.log("Usuario o contraseña no coinciden");
            }
        }

        console.log("Intentaste ingresar muchas veces, tu cuenta fué bloqueada por 24 horas");
    } else if (estasRegistrado === 2) {
        // Registro de usuario
        const nombre = prompt("Ingrese un nombre de usuario para registrarse: ");
        const contraseña = prompt("Ingrese una contraseña para tu usuario: ");
        const saldo = prompt("Ingrese saldo inicial para tu cuenta: ");

        registrarUsuario(nombre, contraseña, saldo);
        console.log("Usuario registrado");
    } else {
        estasRegistrado = Number(prompt(`Ingresa un valor válido: 
                1. Iniciar sesión.
                2. Registrarse`));
        menuInicioSesion();
    }


}

menuInicioSesion();