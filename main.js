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

const nombreProducto = document.getElementById('nombreProducto');
const valorPesos = document.getElementById('valorPesos');
const agregarProductoBtn = document.getElementById('agregarProductoBtn');
const filtroInput = document.getElementById('filtro');
const listaProductos = document.getElementById('listaProductos');
const fechaHora = document.getElementById('fechaHora');
let productos = obtenerProductosDesdeLocalStorage() || [];

agregarProductoBtn.addEventListener('click', agregarProducto);
filtroInput.addEventListener('input', filtrarProductos);

mostrarProductos();

function agregarProducto() {
  const productoNombre = nombreProducto.value;
  const valorEnPesos = parseFloat(valorPesos.value);

  if (productoNombre && !isNaN(valorEnPesos)) {
    const nuevoProducto = new Producto(productoNombre, valorEnPesos);
    productos.push(nuevoProducto);
    guardarProductosEnLocalStorage(productos);
    mostrarProductos();
    nombreProducto.value = '';
    valorPesos.value = '';
  } else {
    alert('Ingresa un producto y un valor válido en pesos.');
  }
}

function mostrarProductos(productosMostrados) {
  listaProductos.innerHTML = '';

  if (productosMostrados && productosMostrados.length > 0) {
    productosMostrados.forEach(function(producto, index) {
      const li = document.createElement('li');
      li.innerHTML = `Producto: ${producto.nombre}, Valor en pesos: ${producto.valorEnPesos}, Precio en dólares: $${producto.precioEnDolares.toFixed(2)} 
      <button class="borrar" data-index="${index}">Borrar</button>`;
      listaProductos.appendChild(li);
    });
  } else {
    listaProductos.innerHTML = 'No se encontraron productos.';
  }
}

function guardarProductosEnLocalStorage(productos) {
  localStorage.setItem('productos', JSON.stringify(productos));
}

function obtenerProductosDesdeLocalStorage() {
  const productosJSON = localStorage.getItem('productos');
  return productosJSON ? JSON.parse(productosJSON) : [];
}

function filtrarProductos() {
  const filtroTexto = filtroInput.value.toLowerCase();
  
  if (filtroTexto.trim() === '') {
    // Si el filtro está vacío o solo contiene espacios en blanco, mostrar todos los productos
    mostrarProductos(productos);
  } else {
    const productosFiltrados = productos.filter(function(producto) {
      return producto.nombre.toLowerCase().includes(filtroTexto);
    });
  
    mostrarProductos(productosFiltrados);
  }
}

listaProductos.addEventListener('click', function(e) {
  if (e.target.classList.contains('borrar')) {
    const index = e.target.getAttribute('data-index');
    productos.splice(index, 1);
    guardarProductosEnLocalStorage(productos);
    mostrarProductos();
  }
});

function actualizarFechaYHora() {
  const fechaActual = new Date();
  const fechaLegible = fechaActual.toLocaleDateString();
  const horaLegible = fechaActual.toLocaleTimeString();
  const fechaYHoraActual = `${fechaLegible} - ${horaLegible}`;
  fechaHora.textContent = "Fecha y hora actual: " + fechaYHoraActual;
}

actualizarFechaYHora();
setInterval(actualizarFechaYHora, 1000);
