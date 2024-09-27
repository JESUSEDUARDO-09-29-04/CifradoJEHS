document.getElementById('cifrar').addEventListener('click', manejarCifrado);
document.getElementById('descifrar').addEventListener('click', manejarDescifrado);
document.getElementById('copiar').addEventListener('click', copiarTexto);

function validarFormulario(mensaje, columnas) {
    if (!mensaje) {
        alert('El campo de mensaje no puede estar vacío');
        return false;
    }
    if (columnas < 3) {
        alert('El número de columnas debe ser mayor o igual a 3');
        return false;
    }
    return true;
}

function manejarCifrado() {
    const mensaje = document.getElementById('mensaje').value;
    const columnas = parseInt(document.getElementById('columnas').value);

    if (!validarFormulario(mensaje, columnas)) return;
    if (columnas > mensaje.length) {
        alert('El número de columnas no puede ser mayor que la longitud del mensaje.');
        return;
    }

    const { mensajeCifrado, matriz } = cifrarEscitala(mensaje, columnas);
    document.getElementById('resultado').textContent = mensajeCifrado;
    generarMatriz(matriz);
}

function manejarDescifrado() {
    const mensaje = document.getElementById('mensaje').value;
    const columnas = parseInt(document.getElementById('columnas').value);

    if (!validarFormulario(mensaje, columnas)) return;

    try {
        const mensajeDescifrado = descifrarEscitala(mensaje, columnas);
        document.getElementById('resultado').textContent = mensajeDescifrado;
    } catch (error) {
        alert('Error durante el descifrado');
    }
}

function generarMatriz(matriz) {
    const matrizTable = document.getElementById('matriz');
    matrizTable.innerHTML = ''; // Limpiar la tabla

    matriz.forEach((fila) => {
        const row = document.createElement('tr');
        fila.forEach((columna) => {
            const cell = document.createElement('td');
            cell.textContent = columna || ' ';
            row.appendChild(cell);
        });
        matrizTable.appendChild(row);
    });
}

function copiarTexto() {
    const resultado = document.getElementById('resultado').textContent;
    if (resultado) {
        navigator.clipboard.writeText(resultado)
            .then(() => alert('Texto copiado'))
            .catch(() => alert('Error al copiar el texto'));
    }
}

// Funciones de cifrado y descifrado de Escítala
function cifrarEscitala(mensaje, columnas) {
    let filas = Math.ceil(mensaje.length / columnas);
    let matriz = [];

    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
    }

    for (let i = 0; i < mensaje.length; i++) {
        let fila = Math.floor(i / columnas);
        let columna = i % columnas;
        matriz[fila][columna] = mensaje[i];
    }

    let mensajeCifrado = '';
    for (let columna = 0; columna < columnas; columna++) {
        for (let fila = 0; fila < filas; fila++) {
            if (matriz[fila][columna]) {
                mensajeCifrado += matriz[fila][columna];
            }
        }
    }

    return { mensajeCifrado, matriz };
}

function descifrarEscitala(mensaje, columnas) {
    let filas = Math.ceil(mensaje.length / columnas);
    let matriz = [];

    for (let i = 0; i < columnas; i++) {
        matriz[i] = [];
    }

    let index = 0;
    for (let columna = 0; columna < columnas; columna++) {
        for (let fila = 0; fila < filas; fila++) {
            if (index < mensaje.length) {
                matriz[fila][columna] = mensaje[index];
                index++;
            }
        }
    }

    let mensajeDescifrado = '';
    for (let fila = 0; fila < filas; fila++) {
        for (let columna = 0; columna < columnas; columna++) {
            if (matriz[fila][columna]) {
                mensajeDescifrado += matriz[fila][columna];
            }
        }
    }

    return mensajeDescifrado;
}
// Obtener elementos del DOM
const modal = document.getElementById("modalInstrucciones");
const spanCerrar = document.querySelector(".close");
const btnAyuda = document.getElementById("ayuda");
const instruccionesTexto = document.getElementById("instruccionesTexto");

// Función para mostrar el modal con instrucciones
function mostrarInstrucciones(cifrado) {
    if (cifrado === "cesar") {
        instruccionesTexto.innerHTML = `
            1. Ingresa el mensaje que deseas cifrar o descifrar.<br>
            2. Selecciona el número de desplazamiento.<br>
            3. Haz clic en "Cifrar" o "Descifrar" para obtener el resultado.<br>
            4. Usa el botón "Copiar" para guardar el texto cifrado/descifrado.
        `;
    } else if (cifrado === "escitala") {
        instruccionesTexto.innerHTML = `
            1. Ingresa el mensaje que deseas cifrar o descifrar.<br>
            2. Selecciona el número de columnas (mínimo 3).<br>
            3. Haz clic en "Cifrar" o "Descifrar" para obtener el resultado.<br>
            4. Puedes ver la matriz generada (solo en cifrado).<br>
            5. Usa el botón "Copiar" para guardar el texto cifrado/descifrado.
        `;
    }
    modal.style.display = "block";
}

// Cuando el usuario hace clic en la "X", cierra el modal
spanCerrar.onclick = function() {
    modal.style.display = "none";
}

// También cerrar el modal si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Mostrar el modal al hacer clic en el botón de ayuda (❓)
btnAyuda.onclick = function() {
    mostrarInstrucciones(document.body.dataset.cifrado);
}

// Llama a mostrarInstrucciones cuando se carga la página
document.addEventListener("DOMContentLoaded", function() {
    mostrarInstrucciones(document.body.dataset.cifrado);
});
