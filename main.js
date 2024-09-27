document.getElementById('copiar').addEventListener('click', copiarTexto);
function cifrar() {
    const inputText = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shift').value);
    const outputText = document.getElementById('outputText');
    

    if (isNaN(shift)) {
        M.toast({ html: 'Por favor, ingresa un desplazamiento válido (número entero).' });
        return;
    }

    const result = aplicarCifrado(inputText, shift);
    outputText.value = result;
}

function descifrar() {
    const inputText = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shift').value);
    const outputText = document.getElementById('outputText');

    if (isNaN(shift)) {
        M.toast({ html: 'Por favor, ingresa un desplazamiento válido (número entero).' });
        return;
    }

    const result = aplicarCifrado(inputText, -shift);
    outputText.value = result;
}

function aplicarCifrado(texto, desplazamiento) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let i = 0; i < texto.length; i++) {
        let char = texto[i];

        if (alphabet.includes(char)) {
            let index = alphabet.indexOf(char);
            let newIndex = (index + desplazamiento) % alphabet.length;
            if (newIndex < 0) {
                newIndex = alphabet.length + newIndex;
            }
            result += alphabet[newIndex];
        } else {
            result += char;
        }
    }

    return result;
}
function copiarTexto() {
    const outputText = document.getElementById('outputText').value; // Usar el valor del textarea
    if (outputText) {
        navigator.clipboard.writeText(outputText)
            .then(() => alert('Texto copiado'))
            .catch(() => alert('Error al copiar el texto'));
    } else {
        alert('No hay texto para copiar');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit(); // Inicializa Materialize CSS
});
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
