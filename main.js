const productos = [
    { nombre: "Tampón", precio: 10 },
    { nombre: "Toalla Higiénica", precio: 15 },
    { nombre: "Copa Menstrual", precio: 20 },
    { nombre: "Toallas Diarias", precio: 5 },
];

let carrito = [];

function mostrarProductos() {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = 'Productos disponibles:<br>';
    productos.forEach((producto) => {
        const boton = document.createElement('button');
        boton.textContent = 'Añadir al carrito';
        boton.onclick = () => agregarAlCarrito(producto.nombre, producto.precio);

        // Agregar la clase a los botones
        boton.classList.add('añadir-al-carrito-btn');

        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto';
        productoDiv.innerHTML = `<h2>${producto.nombre}</h2>
                                <p>Precio: $${producto.precio}</p>`;
        
        // Agregar el botón al div del producto
        productoDiv.appendChild(boton);

        // Agregar el div del producto al contenedor principal
        productosDiv.appendChild(productoDiv);
    });
}


function agregarAlCarrito(producto, precio) {
    const cantidadInput = document.getElementById(`cantidad-${producto}`);
    const unidades = parseInt(cantidadInput.value);

    if (!unidades || unidades < 1) {
        return;
    }

    carrito.push({ producto, unidades, precio });
    actualizarCarrito();
    mostrarPopupAgregado(producto, unidades);
    cantidadInput.value = '';
}

function actualizarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = 'Carrito de compras:<br>';
    let totalCarrito = 0;

    carrito.forEach((item) => {
        const subtotal = item.unidades * item.precio;
        totalCarrito += subtotal;
        carritoDiv.innerHTML += `${item.unidades} x ${item.producto} - Total: $${subtotal}<br>`;
    });

    const totalCarritoElement = document.getElementById('total-carrito');
    totalCarritoElement.textContent = `Total del carrito: $${totalCarrito}`;

    const pagarButton = document.getElementById('pagar');
    if (!pagarButton) {
        carritoDiv.innerHTML += `<button id="pagar" onclick="procederAlPago()">Pagar</button>`;
    }
}

function mostrarPopupAgregado(producto, unidades) {
    const popupDiv = document.createElement('div');
    popupDiv.className = 'popup';
    popupDiv.textContent = `Se añadieron ${unidades} unidades de ${producto} al carrito.`;

    document.body.appendChild(popupDiv);

    setTimeout(() => {
        document.body.removeChild(popupDiv);
    }, 2000);
}

function procederAlPago() {
    const totalCarrito = document.getElementById('total-carrito').textContent;
    alert(`Casi listo para pagar. Total: ${totalCarrito}. ¡Gracias por comprar en Ninfa!`);
    // Aquí podrías redirigir a una página de pago real o realizar acciones adicionales según tus necesidades
}

mostrarProductos();
