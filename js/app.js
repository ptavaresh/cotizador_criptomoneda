const cotizador = new API('f48f0df5aaba8dfc0bf74a1790f5d14f6a719e8778b8f4d1940e1a5485bb51cf');
const ui = new Interfaz();


//Leer el formulario
const formulario = document.querySelector('#formulario');

//eventListener
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    //Leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    //Leer la criptomoneda seleccionada
    const criptoMonedaSelect = document.querySelector('#criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

    //comprobar que ambos campos tengn algo seleccionado
    if(monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
        //arrojar alerta de error
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');

    } else {
        // todo bien, consultar la api
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada) 
             .then(data => {
                  ui.mostrarResultado(data.resultado.RAW,monedaSeleccionada, criptoMonedaSeleccionada );
             })
   }


})