// Función para botón de navegación entre index.html y carrito.html //

function irCaballo() {
    window.location.href = '../index.html';
}

const botonCaballo = document.getElementById('boton-caballo');
botonCaballo.addEventListener('click', irCaballo)

// Elementos guardados en localStorage y generación del listado de caballos en carrito //

document.addEventListener('DOMContentLoaded', function() {
    const listaCaballos = document.getElementById('lista-caballos');
    const totalContainer = document.getElementById('total');
    const carreta = JSON.parse(localStorage.getItem('carreta')) || [];
    carreta.forEach((caballo, index) => {
        const listItem = document.createElement('li');
        const precioFinal = caballo.precio.toFixed(2);
        listItem.textContent = `${index + 1}: ${caballo.raza} ${caballo.tier} ${caballo.edad} - Precio: ${precioFinal} monedas`;

// Botón para eliminar caballos del carrito individualmente //

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Quitar caballo';
        botonEliminar.setAttribute('id', 'botonEliminar')
        botonEliminar.addEventListener('click', () => eliminarCaballo(index));
        listItem.appendChild(botonEliminar);
        listaCaballos.appendChild(listItem);
    });

// Actualización permanente de subtotal según caballos en el carrito //
    
    const subtotal = carreta.reduce ((total, caballo) => total + caballo.precio, 0);
    totalContainer.textContent = `Subtotal: ${subtotal.toFixed(1)} monedas`;
    function eliminarCaballo(index) {
        carreta.splice(index, 1); 
        localStorage.setItem('carreta', JSON.stringify(carreta)); 
        location.reload();
    }
});

function calcularSubtotal() {
    let subtotal = 0;
    carreta.forEach(caballo => {
        const precioBaseRaza = preciosCaballos.razas[caballo.raza].precioBase;
        const multiplicadorTier = preciosCaballos.tiers[caballo.tier].multiplicador;
        const multiplicadorEdad = preciosCaballos.edades[caballo.edad].multiplicador;
        const precioFinal = precioBaseRaza * multiplicadorTier * multiplicadorEdad;
        subtotal += precioFinal;
    });
    return subtotal.toFixed(1);
}

function actualizarSubtotal() {
    const subtotalElemento = document.getElementById('total');
    if (subtotalElemento) {
        subtotalElemento.textContent = `Subtotal: ${calcularSubtotal()} monedas`;
    }
}

// Función para vaciar el carrito

document.getElementById('vaciar-carrito').addEventListener('click', confirmarVaciado);

function vaciar() {
    localStorage.removeItem('carreta');
    const listaCaballos = document.getElementById('lista-caballos');
    listaCaballos.innerHTML = '';
    const total = document.getElementById('total');
    total.innerHTML = 'Subtotal: 0.0 monedas'
}

function confirmarVaciado() {
    Swal.fire({
        background: '#ffffffd2',
        backdrop: '#755f4e8a',
        title: "Desea vaciar la carreta?",
        text: "Esto eliminará todos los caballos seleccionados",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#bb3131",
        cancelButtonColor: "#13772c",
        confirmButtonText: "Si, desatar los caballos",
        cancelButtonText: "No, conservarlos",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                background: '#ffffffd2',
                backdrop: '#755f4e8a',
                title: "Carreta vaciada",
                text: "Todos los caballos fueron devueltos al establo",
                imageUrl: '../img/carreta.png',
                confirmButtonColor: "#13772c",
                confirmButtonText: 'Aceptar'
            }).then((innerResult) => {
                if (innerResult.isConfirmed) {
                    vaciar();
                }
            });
        }
    });
}