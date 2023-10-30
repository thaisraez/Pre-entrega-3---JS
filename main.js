const productos = [
    { nombre: "toalla diaria", precio: 5 },
    { nombre: "tampón", precio: 10 },
    { nombre: "toalla higiénica", precio: 15 },
    { nombre: "copa menstrual", precio: 20 },
];

let carrito = [];

function mostrarProductos() {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = 'Productos disponibles:<br>';
    productos.forEach((producto) => {
        productosDiv.innerHTML += `${producto.nombre} - ${producto.precio} $ <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</button><br>`;
    });
}

function agregarAlCarrito(producto, precio) {
    const unidades = parseInt(prompt(`¿Cuántas unidades de ${producto} deseas comprar?`));
    if (!unidades || unidades < 1) {
        alert('Cantidad inválida. Debe ser un número mayor que 0.');
        return;
    }
    
    carrito.push({ producto, unidades, precio });
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = 'Carrito de compras:<br>';
    let totalCarrito = 0;
    
    carrito.forEach((item) => {
        const subtotal = item.unidades * item.precio;
        totalCarrito += subtotal;
        carritoDiv.innerHTML += `${item.unidades} x ${item.producto} - Total: ${subtotal} $<br>`;
    });
    
    carritoDiv.innerHTML += `Total del carrito: ${totalCarrito} $`;
}

document.getElementById('comprar').addEventListener('click', () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
});

mostrarProductos();

if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    actualizarCarrito();
}