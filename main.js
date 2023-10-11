
class Producto {
  constructor(nombre, valorEnPesos) {
    this.nombre = nombre;
    this.valorEnPesos = valorEnPesos;
    this.precioEnDolares = this.calcularPrecioEnDolares();
  }
  
  calcularPrecioEnDolares() {
    const valorDolarEnPesos = 740;
    return this.valorEnPesos / valorDolarEnPesos;
  }
}

let nombreProducto = document.getElementById('nombreProducto');
let valorPesos = document.getElementById('valorPesos');
let agregarProductoBtn = document.getElementById('agregarProductoBtn');
let calcularBtn = document.getElementById('calcularBtn');
let filtroInput = document.getElementById('filtro');
let listaProductos = document.getElementById('listaProductos');
let productos = [];

function agregarProducto() {
  let productoNombre = nombreProducto.value;
  let valorEnPesos = parseFloat(valorPesos.value);

  if (productoNombre && !isNaN(valorEnPesos)) {
    let nuevoProducto = new Producto(productoNombre, valorEnPesos);
    productos.push(nuevoProducto);
    mostrarProductos();
    nombreProducto.value = '';
    valorPesos.value = '';
  } else {
    alert('Ingresa un producto y un valor válido en pesos.');
  }
}

function mostrarProductos() {
  listaProductos.innerHTML = '';
  productos.forEach(function(producto) {
    let li = document.createElement('li');
    li.textContent = `Producto: ${producto.nombre}, Valor en pesos: ${producto.valorEnPesos}, Precio en dólares: $${producto.precioEnDolares.toFixed(2)}`;
    listaProductos.appendChild(li);
  });
}

agregarProductoBtn.addEventListener('click', agregarProducto);
filtroInput.addEventListener('input', function() {
  let filtroTexto = filtroInput.value.toLowerCase();

  let productosFiltrados = productos.filter(function(producto) {
    return producto.nombre.toLowerCase().includes(filtroTexto);
  });
  mostrarProductos();
});

function actualizarFechaYHora() {
  const fechaActual = new Date();
  const fechaLegible = fechaActual.toLocaleDateString();
  const horaLegible = fechaActual.toLocaleTimeString();
  const fechaYHora = `${fechaLegible} - ${horaLegible}`;
  const elementoFechaHora = document.getElementById("fechaHora");
  elementoFechaHora.textContent = "Fecha y hora actual: " + fechaYHora;
}
actualizarFechaYHora();
setInterval(actualizarFechaYHora, 1000);
