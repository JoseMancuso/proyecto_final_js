// Base de datos de razas, tiers, edades, precios, imágenes //
const preciosCaballos = {
    razas: {
        "Mustang": 
        { 
            precioBase: 340, 
            imagen: "./img/mustang.jpg"
        },
        "Anglonórdico": 
        {
            precioBase: 370,
            imagen: "./img/anglonordico.jpg"},
        "Trotador Pavalonico": 
        {
            precioBase: 400,
            imagen: "./img/pavalonico.jpg"
        },
        "Bretón Imperial": 
        {
            precioBase: 440, 
            imagen: "./img/breton.jpg"
        },
        "Tronador Caeterrano": 
        {
            precioBase: 480, 
            imagen: "./img/caeterrano.jpg"
        },
        "Crinlarga Elfico": 
        {
            precioBase: 510, 
            imagen: "./img/crinlarga.jpg"
        },
        "Pasofino Naerita": 
        {
            precioBase: 550, 
            imagen: "./img/pasofino.jpg"
        },
        "Dunes Aslahbico": 
        {
            precioBase: 590, 
            imagen: "./img/dunes.jpg"
        },
        "Sulemitano Real": 
        {
            precioBase: 630, 
            imagen: "./img/sulemitano.jpg"
        }
    },
    tiers: {
        "Mestizo": 
        {
            multiplicador: 0.9, 
            imagen: "./img/mestizo.jpg"
        },
        "Estandar": 
        {
            multiplicador: 1,
            imagen: "./img/estandar.jpg"
        },
        "Noble": 
        {
            multiplicador: 1.2,
            imagen: "./img/noble.jpg"
        },
        "Campeón": 
        {
            multiplicador: 1.4,
            imagen: "./img/campeon.jpg"
        },
        "Purasangre": 
        {
            multiplicador: 1.7,
            imagen: "./img/purasangre.jpg"
        }
    },
    edades: {
        "Potrillo": 
        {
            multiplicador: 0.8,
            imagen: "./img/potrillo.jpg"
        },
        "Jóven": 
        {
            multiplicador: 1.1,
            imagen: "./img/joven.jpg"
        },
        "Adulto": 
        {
            multiplicador: 1.2,
            imagen: "./img/adulto.jpg"
        },
        "Viejo": 
        {
            multiplicador: 0.6,
            imagen: "./img/viejo.jpg"
        }
    }
};

// Definiciones globales //
const contenedor = document.querySelector('#opciones');
let seleccionRaza = "";
let seleccionTier = "";
let seleccionEdad = "";

// Funciones de actualización visual de DOM según interacción del usuario //

function cambiarTitulo(mensaje) {
    let titulo = document.getElementById('titulo');
    if (titulo) {
        titulo.textContent = mensaje;
    }
}

function ocultarTarjetas() {
    contenedor.innerHTML = "";
}

function ocultarBoton() {
    const button = document.querySelector('#iniciar');
    if (button) {
        button.style.display = 'none';
    }
}

// Funciones para generación de opciones y guardado del producto final //

function crearTarjetasRazas() { 
    for (let nombreRaza in preciosCaballos.razas) {
        const raza = preciosCaballos.razas[nombreRaza];
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        const imagen = document.createElement("img");
        imagen.src = raza.imagen;
        imagen.alt = nombreRaza; 
        tarjeta.appendChild(imagen);
        const nombreElemento = document.createElement("h3");
        nombreElemento.textContent = nombreRaza;
        nombreElemento.classList.add("nombre-oculto"); 
        tarjeta.appendChild(nombreElemento);
        contenedor.appendChild(tarjeta);
        tarjeta.addEventListener('click', seleccionarRaza);
    }
}

function crearTarjetasTier() {
    ocultarTarjetas();
    for (let nombreTier in preciosCaballos.tiers) {
        const tier = preciosCaballos.tiers[nombreTier];
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        const imagen = document.createElement("img");
        imagen.src = tier.imagen;
        imagen.alt = nombreTier;
        tarjeta.appendChild(imagen);
        const nombreElemento = document.createElement("h3");
        nombreElemento.textContent = nombreTier;
        nombreElemento.classList.add("nombre-oculto");
        tarjeta.appendChild(nombreElemento);
        tarjeta.setAttribute("data-tier", nombreTier);
        contenedor.appendChild(tarjeta);
        tarjeta.addEventListener('click', seleccionarTier);
    }
}

function crearTarjetasEdades() {
    ocultarTarjetas();
    for (let nombreEdad in preciosCaballos.edades) {
        const edad = preciosCaballos.edades[nombreEdad];
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        const imagen = document.createElement("img");
        imagen.src = edad.imagen;
        imagen.alt = nombreEdad;
        tarjeta.appendChild(imagen);
        const nombreElemento = document.createElement("h3");
        nombreElemento.textContent = nombreEdad;
        nombreElemento.classList.add("nombre-oculto");
        tarjeta.appendChild(nombreElemento);
        tarjeta.setAttribute("data-edad", nombreEdad);
        contenedor.appendChild(tarjeta);
        tarjeta.addEventListener('click', seleccionarEdad);
    }
}

function mostrarSwal() {
    Swal.fire({
        background: '#ffffffd2',
        backdrop: '#755f4e8a',
        title: "Está seguro que desea agregar el caballo a la carreta?",
        color: '#c28540',
        imageUrl: './img/carreta.png',
        showCancelButton: true,
        cancelButtonText: "No, elegir otro",
        confirmButtonColor: "#13772c",
        cancelButtonColor: "#bb3131",
        confirmButtonText: "Si, agregar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Caballo agregado a la carreta",
                imageUrl: './img/caballo.png',
                confirmButtonText: "Comprar otro caballo",
                confirmButtonColor: '#13772c',
                showCancelButton: true,
                cancelButtonColor: '#c28540',
                cancelButtonText: 'Ir a la carreta',
            }).then((innerResult) => {
                if (innerResult.isConfirmed) {
                    agregarAlCarrito_CrearTarjetasRazas()
                }
                else (
                    agregarAlCarrito(),
                    irCarreta()
                )
            });
        }
        else (
            borrarSeleccion()
        )
    });
}

function crearTarjetaFinal() {
    ocultarTarjetas();
    const tarjetaFinal = document.createElement("div");
    tarjetaFinal.classList.add("tarjeta-final");
    const imagen = document.createElement("img");
    imagen.src = preciosCaballos.razas[seleccionRaza].imagen;
    imagen.alt = seleccionRaza;
    tarjetaFinal.appendChild(imagen);
    const nombreElemento = document.createElement("h3");
    nombreElemento.textContent = `${seleccionRaza} ${seleccionTier} ${seleccionEdad}`;
    tarjetaFinal.appendChild(nombreElemento);
    const precioBaseRaza = preciosCaballos.razas[seleccionRaza].precioBase;
    const multiplicadorTier = preciosCaballos.tiers[seleccionTier].multiplicador;
    const multiplicadorEdad = preciosCaballos.edades[seleccionEdad].multiplicador;
    const precioFinal = precioBaseRaza * multiplicadorTier * multiplicadorEdad;
    const precioRedondeado = precioFinal.toFixed(2);
    const precioElemento = document.createElement("p");
    precioElemento.textContent = `Precio: ${precioRedondeado} monedas`;
    tarjetaFinal.appendChild(precioElemento);
    const botonAgregarCarreta = document.createElement("div");
    botonAgregarCarreta.classList.add("boton-agregar");
    botonAgregarCarreta.textContent = "Agregar a la carreta";
    botonAgregarCarreta.addEventListener("click", mostrarSwal);
    tarjetaFinal.appendChild(botonAgregarCarreta);
    const botonBorrarSeleccion = document.createElement("div");
    botonBorrarSeleccion.classList.add("boton-elegir");
    botonBorrarSeleccion.textContent = "Elegir otro caballo";
    botonBorrarSeleccion.addEventListener("click", borrarSeleccion);
    tarjetaFinal.appendChild(botonBorrarSeleccion);
    contenedor.appendChild(tarjetaFinal);
}

function seleccionarRaza(event) {
    seleccionRaza = event.target.textContent;
    cambiarTitulo("Seleccione el tier del caballo");
    crearTarjetasTier();
}

function seleccionarTier(event) {
    seleccionTier = event.currentTarget.getAttribute("data-tier");
    cambiarTitulo("Seleccione la edad del caballo");
    crearTarjetasEdades();
}

function seleccionarEdad(event) {
    seleccionEdad = event.currentTarget.getAttribute("data-edad");
    cambiarTitulo("Desea agregar este caballo a la carreta, o elegir otro?")
    const precioBaseRaza = preciosCaballos.razas[seleccionRaza].precioBase;
    const multiplicadorTier = preciosCaballos.tiers[seleccionTier].multiplicador;
    const multiplicadorEdad = preciosCaballos.edades[seleccionEdad].multiplicador;
    const precioFinal = precioBaseRaza * multiplicadorTier * multiplicadorEdad;
    crearTarjetaFinal();
}

// Funcion para boton "iniciar". Pretendo sacarlo para la entrega final.

document.querySelector('#iniciar').addEventListener('click', function() {
    cambiarTitulo("Seleccione la raza del caballo");
    ocultarBoton();
    crearTarjetasRazas();
});

// Función para guardado de caballo generado en array para carrito y localStorage //

let carreta = JSON.parse(localStorage.getItem('carreta')) || [];

function agregarAlCarrito() {
    const precioBaseRaza = preciosCaballos.razas[seleccionRaza].precioBase;
    const multiplicadorTier = preciosCaballos.tiers[seleccionTier].multiplicador;
    const multiplicadorEdad = preciosCaballos.edades[seleccionEdad].multiplicador;
    const precioFinal = precioBaseRaza * multiplicadorTier * multiplicadorEdad;
    const caballoSeleccionado = {
        raza: seleccionRaza,
        tier: seleccionTier,
        edad: seleccionEdad,
        precio: precioFinal
    };
    carreta.push(caballoSeleccionado);
    localStorage.setItem('carreta', JSON.stringify(carreta));
    seleccionRaza = "";
    seleccionTier = "";
    seleccionEdad = "";
    cambiarTitulo("Se agregó el caballo seleccionado a la carreta. Desea agregar otro?");
    contenedor.innerHTML = "";
}

function agregarAlCarrito_CrearTarjetasRazas() {
    agregarAlCarrito();
    crearTarjetasRazas();
}

// Funcion para descartar el caballo generado y volver a iniciar la calculadora //

function borrarSeleccion() {
    seleccionRaza = "";
    seleccionTier = "";
    seleccionEdad = "";
    cambiarTitulo("Seleccione la raza del caballo");
    contenedor.innerHTML = "";
    crearTarjetasRazas();
}

// Funciones para botones de navegación //

function irCarreta() {
    window.location.href = './pages/carrito.html';
}

const botonCarreta = document.getElementById('boton-carreta');
botonCarreta.addEventListener('click', irCarreta)

function irProximamente() {
    window.location.href = './pages/proximamente.html';
}

const botonProximamente = document.getElementById('boton-proximamente');
botonProximamente.addEventListener('click', irProximamente)

