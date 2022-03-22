//constructor
function Cotiza(marca, anio, enganche, plazo) {
    this.marca = marca;
    this.anio = anio;
    this.enganche = enganche;
    this.plazo = plazo;
}

//Cotizar
Cotiza.prototype.cotizar = function() {

    let cantidad;
    const base = 4000;

    switch (this.marca) {
        case 'BMW':
            cantidad = base * 1.15;
            break;
        case 'Mercedes-Benz':
            cantidad = base * 1.05;
            break;
        case 'Audi':
            cantidad = base * 1.35;
            break;
        case 'Lexus':
            cantidad = base * 1.45;
            break;
        case 'Renault':
            cantidad = base * 1.75;
            break;
        case 'Ford':
            cantidad = base * 1.95;
            break;
        case 'Opel':
            cantidad = base * 1.25;
            break;
        case 'Seat':
            cantidad = base * 1.20;
            break;
        case 'Honda':
            cantidad = base * 2;
            break;
        case 'Hyundai':
            cantidad = base * 2.05;
            break;
        case 'Volkswagen':
            cantidad = base * 2.1;
            break;
        case 'Kia':
            cantidad = base * 1.85;
            break;
        case 'Nissan':
            cantidad = base * 1.55;
            break;
        case 'Maserati':
            cantidad = base * 3;
            break;
    }

    cantidad = (this.anio - 2000) * cantidad;

    return cantidad;
}

//parte visual HTML
function Interfaz() {}

//Mensaje en HTml
Interfaz.prototype.mostarMensaje = function(mensaje, tipo) {
    const div = document.createElement("div ");

    if (tipo === 'error') {
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add("mensaje ", "correcto ");
    }

    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector(".form-group "));

    setTimeout(function() {
        document.querySelector('.mensaje').remove();
    }, 2000);
};


//imprime resultado de cotización
Interfaz.prototype.mostrarResultado = function(cotizacion, total) {
    const resultado = document.getElementById('resultado');
    const cuota = ((total - parseInt(cotizacion.enganche)) / cotizacion.plazo * (1 + cotizacion.plazo / 700)).toFixed(2);

    //crear un div
    const div = document.createElement('div');
    //insertar la información
    div.innerHTML = `<table class="table ">
            <tbody>
              <tr>
                <th scope="row ">Marca</th>
                <td>${cotizacion.marca}</td>
              </tr>
              <tr>
                <th scope="row ">Año</th>
                <td>${cotizacion.anio}</td>
              </tr>
              <tr>
                <th scope="row ">Enganche</th>
                <td>${cotizacion.enganche}</td>
              </tr>
              <tr>
                <th scope="row ">Plazo</th>
                <td>${cotizacion.plazo} Meses</td>
              </tr>
              <tr>
                <th scope="row ">Precio Contado Q.</th>
                <td>` + total.toFixed(2) + `</td>
              </tr>
              <tr>
                <th scope="row ">Cuotas Q.</th>
                <td>` + cuota + `</td>
              </tr>
              <tr>
                <th scope="row ">Total Q.</th>
                <td>` + (parseInt(cotizacion.enganche) + cuota * cotizacion.plazo).toFixed(2) + `</td>
              </tr>
            </tbody>
          </table>`;


    setTimeout(function() {
        resultado.appendChild(div);
    }, 500);

}

//capturar datops del formulario
const formulario = document.getElementById('cotizar');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    //leer la marca seleccionada
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //leer año seleccionado
    const anio = document.getElementById("anio");
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //leer dato del enganche
    const enganche = document.getElementById("enganche").value;

    //leer año seleccionado
    const plazo = document.getElementById("plazo");
    const plazoSeleccionado = plazo.options[plazo.selectedIndex].value;

    //crear instancia de interfaz
    const interfaz = new Interfaz();
    //revisamos que los campos no estén vacíos

    if (marcaSeleccionada === '' || anioSeleccionado === '' || plazo === '' || enganche === '') {
        //interfaz imprimiendo error
        interfaz.mostarMensaje('Faltan Datos, revisa e intenta de nuevo', 'error');
    } else {
        //limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if (resultados != null) {
            resultados.remove();
        }

        const cotizacion = new Cotiza(marcaSeleccionada, anioSeleccionado, enganche, plazoSeleccionado);
        const cantidad = cotizacion.cotizar(cotizacion);
        //mostrar resultado
        interfaz.mostrarResultado(cotizacion, cantidad);
        interfaz.mostarMensaje('Cotizando', 'correcto');
    }
});

const max = new Date().getFullYear(),
    min = max - 10;
const selectAnios = document.getElementById('anio');
for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);

}