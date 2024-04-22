document.addEventListener('DOMContentLoaded', mostrarProximos);

function mostrarProximos(){
fetch('../proximamente.json')
.then(response => response.json())
.then(data => {
    const proximos = document.getElementById('razasCaballos');
    data.forEach(caballo => {
    const div = document.createElement('div');
    div.classList.add("tarjeta");
    div.innerHTML = `
        <h3>${caballo.nombre}</h3>
        <img src="${caballo.imagen}" alt="${caballo.nombre}">
    `;
    proximos.appendChild(div);
    });
})
.catch(error => console.error('Error al cargar los caballos:', error));
}

function volverInicio() {
    window.location.href = '../index.html';
}

const botonVolver = document.getElementById('boton-volver');
botonVolver.addEventListener('click', volverInicio)

