let nombreProducto = document.getElementById('nombreProducto');
let valorPesos = document.getElementById('valorPesos');
let agregarProductoBtn = document.getElementById('agregarProductoBtn');
let calcularBtn = document.getElementById('calcularBtn');

const valorDolarEnPesos = 740; 
let resultadoElement = document.getElementById('resultado'); 

function calcularPrecioEnDolares(valorEnPesos) {
  return valorEnPesos / valorDolarEnPesos;
}

agregarProductoBtn.addEventListener('click', function () {
  let producto = nombreProducto.value;
  let valorEnPesos = parseFloat(valorPesos.value);

  if (producto && !isNaN(valorEnPesos)) {
    let precioEnDolares = calcularPrecioEnDolares(valorEnPesos);
    resultadoElement.textContent = `Producto: ${producto}, Valor en pesos: ${valorEnPesos}, Precio en dólares: $${precioEnDolares.toFixed(2)}`;
  } else {
    alert('Ingresa un producto y un valor válido en pesos.');
  }  
});
