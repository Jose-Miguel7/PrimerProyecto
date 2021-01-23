new Vue({
    el:'#app',
    delimiters: ['{$', '$}'],
    data: {
        recorrido: '',
        fechas: [],
        datos: {},
        muestra: {},
        selected: 'Seleccionar País',
        pais: '',
        colores: ['#d63447', '#0779e4', '#787878', '#54e346', '#ffd66b']
    },
    watch: {
        selected: function(val) {
            this.recorrido = '';
            this.fechas = []
            this.datos = {}

            if (val === 'Seleccionar País') {
                this.pais = 'Todos'
                this.obtenerDatos()

            } else {
                this.pais = val
                this.obtenerDatos()
            }
        }
    },
    methods: {
        paisSelected: function() {
            return '10'
        },
        obtenerDatos: function() {
            if (this.pais === '') {
                this.pais = 'Todos';
            }
            axios.get('/api/mensual?pais=' + this.pais)
                .then((response) => {
                    this.recorrido = response.data;
                    if (this.recorrido.length === 5) {
                        document.querySelector('.chart-container').remove();
                    } else {                    
                        for (let i = 0; i < this.recorrido.length; i++) {
                            if (!this.fechas.includes(this.recorrido[i].fecha)) {
                                this.fechas.push(this.recorrido[i].fecha);
                            } else {
                                console.log()
                            }

                            if (this.datos[this.recorrido[i].pais]) {
                                this.datos[this.recorrido[i].pais].push(this.recorrido[i].ventas);
                            } else {
                                this.datos[this.recorrido[i].pais] = [this.recorrido[i].ventas];
                            }
                        }

                        let paises = Object.keys(this.datos)
                        let configuraciones = [];

                        for (let i = 0; i < paises.length; i++) {
                            var dataSets = {
                                label: 'Ventas Mensuales ' + paises[i],
                                backgroundColor: 'rgb(236, 236, 236, 0.4)',
                                borderColor: this.colores[i],
                                data: this.datos[paises[i]]
                            }

                            configuraciones.push(dataSets);
                        }
                        chartSemanal(this.fechas, configuraciones)
                    }

                    this.muestra = this.recorrido.sort(function(a, b) {
                        return -1
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
})

let chartSemanal = (fechas, datos) => {
    document.getElementById('chart-mensual').remove();
    let canvas = document.createElement('canvas')
    canvas.id = 'chart-mensual';
    document.querySelector('.chart-container').appendChild(canvas)
    var ctxMensual = document.getElementById('chart-mensual').getContext('2d');
    var chartMensual = new Chart(ctxMensual, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: fechas,
            datasets: datos
        },

        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                mode: 'x-axis'
            },
            legend: {
                display: true
            },
            animation: {
                duration: 4000
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}