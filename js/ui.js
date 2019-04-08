class Interfaz {
    
    constructor() {
        //Para no saturar el constructor se recomienda usar una funcion init() para poder asignar los valores
        this.init();
    }
    init() {
        //llama una funcion para obtener la funcion dentro de la clase api
        this.construirSelect();
    }

    construirSelect() {
        //utiliza la instancia de cotizador proveniente de la clase API  
        cotizador.obtenerMonedasAPI()
        .then(monedas => {
            //crear un select de opciones
            const select = document.querySelector('#criptomoneda');
            //iterar por los resultados de la api
            for( const [key, value] of Object.entries(monedas.monedas.Data) ) {
                //anadir el Symbol y el Nombre como opciones
                const opcion = document.createElement('option');
                opcion.value = value.Symbol;
                opcion.appendChild(document.createTextNode(value.CoinName));
                select.appendChild(opcion);
            }
        })
    }

    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));
        //seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes');
        //mostrar contenido
        divMensaje.appendChild(div)

        //eliminar el mesnaje despues de 3 segundos
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    //imprimer el sesultado de la cotizacion de la criptomoneda elegida
    mostrarResultado(resultado, moneda, crypto) {
        //en caso de un resultado anterior, eliminarlo
        const resultadoAnterior = document.querySelector('#resultado > div');
        if (resultadoAnterior) {
            resultadoAnterior.remove();
        }
        const datosMoneda = resultado[crypto][moneda];
        //recortar digito de precio
        //toFixed edondea a 2 decimales
        let precio = datosMoneda.PRICE.toFixed(2),
            porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
            //tomar un time stam de datosMoneda.LASTUPDATE y convertirlo a fecha legible
            actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-mx')
        //construir template
        let templateHTLM = `
        <div class='card bg-warning'>
            <div class='card-body text-light'>
                <h2 class="card-title">Resultado:</h2>
                <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio}</p>
                <p>Variacion ultimo dia: % ${porcentaje}</p>
                <p>Ultima actualizacion: ${actualizado}</p>
            </div>
        </div>
        `;

        this.mostrarOcultarSpinner('block');

        //insertar el resultado
        setTimeout(() => {
            document.querySelector('#resultado').innerHTML = templateHTLM;
            //ocultar spinner
            this.mostrarOcultarSpinner('none');
        }, 3000);
    }
    //mostrar un spinner de carga al enviar las monedas
    mostrarOcultarSpinner(vista) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
    }
}