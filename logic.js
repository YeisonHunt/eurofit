var db = firebase.database();

var update = document.getElementById('update');
update.disabled = true;


const rootRef = db.ref('Users');

// rootRef.orderByKey().on('value', snapshot => {
//     console.log(snapshot.val())
// })


function getDataCourseByUserId(userId) {

    var starCountRef = firebase.database().ref('Users/' + userId);
    starCountRef.on('value', function (snapshot) {
        //console.log(snapshot.val());
        var courseNavette = snapshot.val();

        // Arrays para Course Navette
        var tableNavette = []
        var distances = []
        var times = []
        var keys = []



        for (var key in courseNavette.testcoursenavette) {
            if (courseNavette.testcoursenavette.hasOwnProperty(key)) {
                const element = courseNavette.testcoursenavette[key];

                if (element.distance && element.finaltime && element.straight) {
                    var toAdd = {
                        key: key,
                        distance: element.distance,
                        finaltime: element.finaltime,
                        straight: element.straight
                    }

                    tableNavette.push(toAdd)
                    distances.push(parseInt((element.distance).replace('.', '').replace(':', '').replace('mts', '')))
                    times.push(parseInt((element.finaltime).replace('.', '').replace(':', '')))
                    keys.push(key)

                }

            }
        }

        // Arrays para Vel510
        var speedTimes = []
        var speedDistances = []
        var speedKeys = []
        var tableSpeed = []

        for (var key in courseNavette.testspeed) {
            if (courseNavette.testspeed.hasOwnProperty(key)) {
                var element = courseNavette.testspeed[key];

                if (element.distance && element.finaltime) {

                    var toAdd = {
                        key: key,
                        distance: element.distance,
                        finaltime: element.finaltime

                    }


                    tableSpeed.push(toAdd)

                    speedDistances.push(parseInt((element.distance).replace('.', '').replace(':', '').replace('mts', '')))
                    speedTimes.push(parseInt((element.finaltime).replace('.', '').replace(':', '')))
                    speedKeys.push(key)

                }

            }
        }

        var flexionTroncoDistances = []
        var flexionTroncoKeys = []
        var tableFlexion = []

        for (var key in courseNavette.testflexiontronco) {
            if (courseNavette.testflexiontronco.hasOwnProperty(key)) {
                var element = courseNavette.testflexiontronco[key];

                if (element.distance) {

                    var toAdd = {
                        key: key,
                        distance: element.distance
       
                    }
    
                    tableFlexion.push(toAdd)

                    flexionTroncoDistances.push(parseFloat((element.distance).replace(':', '').replace('mts', '')))
                    flexionTroncoKeys.push(key)

                }

            }
        }

        var saltoDistances01 = []
        var saltoDistances02 = []
        var saltoKeys = []
        var tableSalto = []

        for (var key in courseNavette.testsalto) {
            if (courseNavette.testsalto.hasOwnProperty(key)) {
                var element = courseNavette.testsalto[key];

                if (element.distance01 && element.distance02) {

                    var toAdd = {
                        key: key,
                        distance01: element.distance01,
                        distance02: element.distance02
                    }
    
                    tableSalto.push(toAdd)

                    saltoDistances01.push(parseFloat((element.distance01).replace(':', '').replace('mts', '')))
                    saltoDistances02.push(parseFloat((element.distance02).replace(':', '').replace('mts', '')))
                    saltoKeys.push(key)

                }

            }
        }

        console.log(tableSalto)


        var flexionBrazoDistances = []
        var flexionBrazoKeys = []
        var tableFlexionBrazo = []

        for (var key in courseNavette.testflexionbrazos) {
            if (courseNavette.testflexionbrazos.hasOwnProperty(key)) {
                var element = courseNavette.testflexionbrazos[key];

                if (element.finaltime) {

                    var toAdd = {
                        key: key,
                        finaltime: element.finaltime
       
                    }
    
                    tableFlexionBrazo.push(toAdd)

                    flexionBrazoDistances.push(parseFloat((element.finaltime).replace(':', '').replace('mts', '')))
                    flexionBrazoKeys.push(key)

                }

            }
        }

        
        var tappingDistances = []
        var tappingKeys = []
        var tappingTable = []

        for (var key in courseNavette.testtapping) {
            if (courseNavette.testtapping.hasOwnProperty(key)) {
                var element = courseNavette.testtapping[key];

                if (element.finaltime) {

                    var toAdd = {
                        key: key,
                        finaltime: element.finaltime
       
                    }
    
                    tappingTable.push(toAdd)

                    tappingDistances.push(parseFloat((element.finaltime).replace(':', '').replace('mts', '')))
                    tappingKeys.push(key)

                }

            }
        }

        var abdominalesDistances = []
        var abdominalesKeys = []
        var abdominalesTable = []

        for (var key in courseNavette.testabdominales) {
            if (courseNavette.testabdominales.hasOwnProperty(key)) {
                var element = courseNavette.testabdominales[key];

                if (element.repetitions) {

                    var toAdd = {
                        key: key,
                        repetitions: element.repetitions
       
                    }
    
                    abdominalesTable.push(toAdd)

                    abdominalesDistances.push(parseInt((element.repetitions).replace(':', '').replace('mts', '')))
                    abdominalesKeys.push(key)

                }

            }
        }






        graficarCourseNavette(distances, times, keys)
        funTableNavette(tableNavette)
        graficarvel510(speedDistances, speedTimes, speedKeys)
        funTableSpeed(tableSpeed)
        graficarFlexionTronco(flexionTroncoDistances, flexionTroncoKeys)
        funTableFlexionTronco(tableFlexion)
        graficarSalto(saltoDistances01, saltoDistances02, saltoKeys)
        funTableSalto(tableSalto)
        graficarFlexionBrazo(flexionBrazoDistances, flexionBrazoKeys)
        funTableBrazo(tableFlexionBrazo)
        graficarTapping(tappingDistances, tappingKeys)
        funTableTapping(tappingTable)
        graficarAbdominales(abdominalesDistances, abdominalesKeys)
        funTableAbdominales(abdominalesTable)
        


    });
}

function exportTableToExcel(tableID, filename = ''){

    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}

function graficarAbdominales(distances,keys){

    var ctx = document.getElementById('idAbdominales').getContext('2d')

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: keys,
            datasets: [{
                label:'Pruebas',
                data: distances,
                backgroundColor: 'rgb(99, 179, 237)',
                borderColor: 'rgb(43, 108, 176)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Pruebas'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display:true,
                        labelString:'Repeticiones'
                    }
                }
                    
                ]
            }
        }
    });
}

function graficarTapping(distances,keys){

    var ctx = document.getElementById('idTapping').getContext('2d')

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: keys,
            datasets: [{
                label:'Pruebas',
                data: distances,
                backgroundColor: 'rgb(99, 179, 237)',
                borderColor: 'rgb(43, 108, 176)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Pruebas'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display:true,
                        labelString:'Tiempo (minutos)'
                    }
                }
                    
                ]
            }
        }
    });
}

function graficarFlexionBrazo(distances,keys){

    var ctx = document.getElementById('idBrazo').getContext('2d')

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: keys,
            datasets: [{
                label:'Pruebas',
                data: distances,
                backgroundColor: 'rgb(99, 179, 237)',
                borderColor: 'rgb(43, 108, 176)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Pruebas'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display:true,
                        labelString:'Tiempo (minutos)'
                    }
                }
                    
                ]
            }
        }
    });
}

function graficarSalto(distances01, distances02, keys) {

    var ctx = document.getElementById('idSalto').getContext('2d');


    var chartData = {
        labels: keys,
        datasets: [{
            label: 'Distancia 1 (mts)',
            backgroundColor: 'rgb(99, 179, 237)',
            borderColor: 'rgb(43, 108, 176)',
            yAxisID: 'y-axis-1',
            data: distances01
        }, {
            label: 'Distancia 2 (mts)',
            backgroundColor: 'rgb(255, 255, 255,0.1)',
            borderColor: 'rgb(255, 255, 255, 0.1)',
            yAxisID: 'y-axis-2',
            data: distances02
        }]

    };



    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: chartData,
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,

            },
            scales: {
                yAxes: [{
                    label: 'Distancias',
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    id: 'y-axis-1',
                    scaleLabel: {
                        display: true,
                        labelString: 'Distancia 1 (mts)'
                    },
                }, {
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    id: 'y-axis-2',
                    scaleLabel: {
                        display: true,
                        labelString: 'Distancia 2 (mts)'
                    },
                    gridLines: {
                        drawOnChartArea: false
                    }
                }],
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Pruebas'
                    }
                }],
            }
        }

    });
}

function graficarFlexionTronco(distances,keys){

    var ctx = document.getElementById('idTronco').getContext('2d')

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: keys,
            datasets: [{
                label:'Distancia',
                data: distances,
                backgroundColor: 'rgb(99, 179, 237)',
                borderColor: 'rgb(43, 108, 176)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Pruebas'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display:true,
                        labelString:'Distancia (mts)'
                    }
                }
                    
                ]
            }
        }
    });
}

function graficarvel510(distances, times, keys) {

    var ctx = document.getElementById('speedChart').getContext('2d');


    var chartData = {
        labels: keys,
        datasets: [{
            label: 'Prueba (mss)',
            backgroundColor: 'rgb(99, 179, 237)',
            borderColor: 'rgb(43, 108, 176)',
            yAxisID: 'y-axis-1',
            data: times
        }, {
            label: 'Distancia (mts)',
            backgroundColor: 'rgb(255, 255, 255,0.1)',
            borderColor: 'rgb(255, 255, 255, 0.1)',
            yAxisID: 'y-axis-2',
            data: distances
        }]

    };



    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: chartData,
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,

            },
            scales: {
                yAxes: [{
                    label: 'Tiempo final',
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    id: 'y-axis-1',
                    scaleLabel: {
                        display: true,
                        labelString: 'Tiempo (mss)'
                    },
                }, {
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    id: 'y-axis-2',
                    scaleLabel: {
                        display: true,
                        labelString: 'Distancia (mts)'
                    },
                    gridLines: {
                        drawOnChartArea: false
                    }
                }],
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Pruebas'
                    }
                }],
            }
        }

    });
}

function graficarCourseNavette(distances, times, keys) {

    var ctx = document.getElementById('myChart').getContext('2d');

    var chartData = {
        labels: keys,
        datasets: [{
            label: 'Prueba (mss)',
            backgroundColor: 'rgb(99, 179, 237)',
            borderColor: 'rgb(43, 108, 176)',
            yAxisID: 'y-axis-1',
            data: times
        }, {
            label: 'Distancia (mts)',
            backgroundColor: 'rgb(255, 255, 255,0.1)',
            borderColor: 'rgb(255, 255, 255, 0.1)',
            yAxisID: 'y-axis-2',
            data: distances
        }]

    };



    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: chartData,
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,

            },
            scales: {
                yAxes: [{
                    label: 'Tiempo final',
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    id: 'y-axis-1',
                    scaleLabel: {
                        display: true,
                        labelString: 'Tiempo (mss)'
                    },
                }, {
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    id: 'y-axis-2',
                    scaleLabel: {
                        display: true,
                        labelString: 'Distancia (mts)'
                    },
                    gridLines: {
                        drawOnChartArea: false
                    }
                }],
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Pruebas'
                    }
                }],
            }
        }

        

    });
}



function value(request) {
    return document.getElementById(request).value;
}
function asignation(request, response) {
    return document.getElementById(request).value = response;
}
function printHTML(request, response) {
    return document.getElementById(request).innerHTML += response;
}
function inHTML(request, response) {
    return document.getElementById(request).innerHTML = response;
}
function dateActuality() {
    var fh = new Date();
    return fh.getFullYear() + "-" + (fh.getMonth() + 1) + "-" + fh.getDate() + " " + fh.getHours() + ":" + fh.getMinutes();
}

function funTableAbdominales(info) {

    var tableString = ''

    info.forEach(element => {

        tableString +=
            '<tr>' +
            '<td>' + element.key + '</td>' +
            '<td>' + element.repetitions + '</td>' +
            '</tr>';
    });




    inHTML('tableAbdominales', tableString);

    update.disabled = false;

}

function funTableTapping(info) {

    var tableString = ''

    info.forEach(element => {

        tableString +=
            '<tr>' +
            '<td>' + element.key + '</td>' +
            '<td>' + element.finaltime + ' mts'+ '</td>' +
            '</tr>';
    });




    inHTML('tableTapping', tableString);

    update.disabled = false;

}

function funTableBrazo(info) {

    var tableString = ''

    info.forEach(element => {

        tableString +=
            '<tr>' +
            '<td>' + element.key + '</td>' +
            '<td>' + element.finaltime + ' mts'+ '</td>' +
            '</tr>';
    });




    inHTML('tableBrazo', tableString);

    update.disabled = false;

}

function funTableSalto(info) {

    var tableString = ''

    info.forEach(element => {

        tableString +=
            '<tr>' +
            '<td>' + element.key + '</td>' +
            '<td>' + element.distance01 + ' mts'+ '</td>' +
            '<td>' + element.distance02 + ' mts'+ '</td>' +
            '</tr>';
    });




    inHTML('tableSalto', tableString);

    update.disabled = false;

}

/*Mostrar datos Course Navette*/

function funTableNavette(info) {

    var tableString = ''

    info.forEach(element => {

        tableString +=
            '<tr>' +
            '<td>' + element.key + '</td>' +
            '<td>' + element.distance + '</td>' +
            '<td>' + element.straight + '</td>' +
            '<td>' + element.finaltime + ' ' + 'mm:ss' + '</td>' +
            '</tr>';
    });




    inHTML('tableCourseNavette', tableString);

    update.disabled = false;

}

function funTableSpeed(info) {

    var tableString = ''

    info.forEach(element => {

        tableString +=
            '<tr>' +
            '<td>' + element.key + '</td>' +
            '<td>' + element.distance + ' ' + 'mts' + '</td>' +
            '<td>' + element.finaltime + ' ' + 'mm:ss' + '</td>' +
            '</tr>';
    });




    inHTML('tableSpeedC', tableString);

    update.disabled = false;
}

function funTableFlexionTronco(info) {

    var tableString = ''

    info.forEach(element => {

        tableString +=
            '<tr>' +
            '<td>' + element.key + '</td>' +
            '<td>' + element.distance + ' mts'+ '</td>' +
            '</tr>';
    });




    inHTML('tableTronco', tableString);

    update.disabled = false;

}




function onClickSpeed() {
    var key = value("key");
    console.log(key)

    var reference = db.ref('Users/' + key + '/testspeed');
    reference.on('value', function (speed) {
        var dataspeed = speed.val();
        $.each(dataspeed, function (nodo, value) {
            var sendData = tablespeed(nodo, value.distance, value.finaltime);
            console.log(value.distance)
            console.log(value.finaltime)
            printHTML('loadspeed', sendData);
        });
    });

    function tablespeed(key, distance, finaltime) {

        //distance = distance.replace(/[undefined]/, '');

        return (
            '<tr>' +
            '<td>' + key + '</td>' +
            '<td>' + distance + '</td>' +
            '<td>' + finaltime + '</td>'
        );
    }

}


/*Graficar Tabla con datos de firebase*/
function table(key, Name, Lastname, Age, Gender, Height, Weight, Hip, Waist, ICC, IMC) {

    Name = Name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    Lastname = Lastname.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    Gender = Gender.replace(/[^a-zA-Z0-9]/g, '');
    Height = Height.replace(/^"(.+(?="$))"$/, '$1');
    Weight = Weight.replace(/^"(.+(?="$))"$/, '$1');
    Hip = Hip.replace(/^"(.+(?="$))"$/, '$1');
    Waist = Waist.replace(/^"(.+(?="$))"$/, '$1');
    ICC = ICC.replace(/^"(.+(?="$))"$/, '$1');
    IMC = IMC.replace(/^"(.+(?="$))"$/, '$1');



    return (
        '<tr>' +
        '<td>' + key + '</td>' +
        '<td>' + Name + '</td>' +
        '<td>' + Lastname + '</td>' +
        '<td>' + Age + '</td>' +
        '<td>' + Gender + '</td>' +
        '<td><a href="#deportista" onclick="viewDataUser(\'' + key + '\',\'' + Name + '\',\'' + Lastname +
        '\',\'' + Age + '\',\'' + Gender + '\',\'' + Height + '\',\'' + Weight + '\',\'' + Hip + '\',\'' + Waist + '\',\'' + ICC + '\',\'' + IMC + '\')">' +
        '<i class="fas fa-sign-in-alt"></i></a></td>' +
        '</tr>'
    );
}

function setData(key, Name, Lastname, Age, Gender, Height, Weight, Hip, Waist, ICC, IMC) {
    document.getElementById('idIdentificacion').innerHTML = key
    document.getElementById('idDeportista').innerHTML = Name + " " + Lastname
    document.getElementById('idEdad').innerHTML = Age
    document.getElementById('idGenero').innerHTML = Gender
    document.getElementById('idEstatura').innerHTML = Height
    document.getElementById('idPeso').innerHTML = Weight
    document.getElementById('idCadera').innerHTML = Hip
    document.getElementById('idCintura').innerHTML = Waist
    document.getElementById('idICC').innerHTML = ICC
    document.getElementById('idIMC').innerHTML = IMC
}

function clearData() {
    document.getElementById('idDocument').innerHTML = "?"
}

function showNavette() {
    document.getElementById("graficasRow").style.display = "block";
    document.getElementById("idNavette1").style.display = "block";
    document.getElementById("idNavette2").style.display = "block";
    document.getElementById("idNavetteGrafica1").style.display = "block";
    document.getElementById("idNavetteGrafica2").style.display = "block";
    document.getElementById("btnTableCourseNavetteExcel").style.display = "block";

    hideSpeed()
    hideFlexionTronco()
    hideSaltoHorizontal()
    hideFlexionBrazo()
    hideTapping()
    hideAbdominales()
}

function hideNavette() {

    document.getElementById("idNavette1").style.display = "none";
    document.getElementById("idNavette2").style.display = "none";
    document.getElementById("idNavetteGrafica1").style.display = "none";
    document.getElementById("idNavetteGrafica2").style.display = "none";
    document.getElementById("btnTableCourseNavetteExcel").style.display = "none";


}

function showSpeed() {
    document.getElementById("graficasRow").style.display = "block";
    document.getElementById("idSpeed1").style.display = "block";
    document.getElementById("idSpeed2").style.display = "block";
    document.getElementById("idSpeedGrafica1").style.display = "block";
    document.getElementById("idSpeedGrafica2").style.display = "block";
    document.getElementById("btnTableSpeedCExcel").style.display = "none";


    hideNavette()
    hideFlexionTronco()
    hideSaltoHorizontal()
    hideFlexionBrazo()
    hideTapping()
    hideAbdominales()
}

function hideSpeed() {

    document.getElementById("idSpeed1").style.display = "none";
    document.getElementById("idSpeed2").style.display = "none";
    document.getElementById("idSpeedGrafica1").style.display = "none";
    document.getElementById("idSpeedGrafica2").style.display = "none";
    document.getElementById("btnTableSpeedCExcel").style.display = "none";

}

function showFlexionTronco() {

    document.getElementById("graficasRow").style.display = "block";
    document.getElementById("idTronco1").style.display = "block";
    document.getElementById("idTronco2").style.display = "block";
    document.getElementById("idTroncoGrafica1").style.display = "block";
    document.getElementById("idTroncoGrafica2").style.display = "block";
    document.getElementById("btnTableTroncoExcel").style.display = "block";


    hideNavette()
    hideSpeed()
    hideSaltoHorizontal()
    hideFlexionBrazo()
    hideTapping()
    hideAbdominales()
}

function hideFlexionTronco() {

    document.getElementById("idTronco1").style.display = "none";
    document.getElementById("idTronco2").style.display = "none";
    document.getElementById("idTroncoGrafica1").style.display = "none";
    document.getElementById("idTroncoGrafica2").style.display = "none";
    document.getElementById("btnTableTroncoExcel").style.display = "none";
}

function showSaltoHorizontal() {

    document.getElementById("graficasRow").style.display = "block";
    document.getElementById("idSalto1").style.display = "block";
    document.getElementById("idSalto2").style.display = "block";
    document.getElementById("idSaltoGrafica1").style.display = "block";
    document.getElementById("idSaltoGrafica2").style.display = "block";
    document.getElementById("btnTableSaltoExcel").style.display = "block";

    hideNavette()
    hideSpeed()
    hideFlexionTronco()
    hideFlexionBrazo()
    hideTapping()
    hideAbdominales()
}

function hideSaltoHorizontal() {

    document.getElementById("idSalto1").style.display = "none";
    document.getElementById("idSalto2").style.display = "none";
    document.getElementById("idSaltoGrafica1").style.display = "none";
    document.getElementById("idSaltoGrafica2").style.display = "none";
    document.getElementById("btnTableSaltoExcel").style.display = "none";
}

function showFlexionBrazo() {

    document.getElementById("graficasRow").style.display = "block";
    document.getElementById("idBrazo1").style.display = "block";
    document.getElementById("idBrazo2").style.display = "block";
    document.getElementById("idBrazoGrafica1").style.display = "block";
    document.getElementById("idBrazoGrafica2").style.display = "block";
    document.getElementById("btnTableBrazoExcel").style.display = "block";

    hideNavette()
    hideSpeed()
    hideFlexionTronco()
    hideSaltoHorizontal()
    hideTapping()
    hideAbdominales()
}

function hideFlexionBrazo() {

    document.getElementById("idBrazo1").style.display = "none";
    document.getElementById("idBrazo2").style.display = "none";
    document.getElementById("idBrazoGrafica1").style.display = "none";
    document.getElementById("idBrazoGrafica2").style.display = "none";
    document.getElementById("btnTableBrazoExcel").style.display = "none";
}

function showTapping() {

    document.getElementById("graficasRow").style.display = "block";
    document.getElementById("idTapping1").style.display = "block";
    document.getElementById("idTapping2").style.display = "block";
    document.getElementById("idTappingGrafica1").style.display = "block";
    document.getElementById("idTappingGrafica2").style.display = "block";
    document.getElementById("btnTableTappingExcel").style.display = "block";

    hideNavette()
    hideSpeed()
    hideFlexionTronco()
    hideSaltoHorizontal()
    hideFlexionBrazo()
    hideAbdominales()
}

function hideTapping() {

    document.getElementById("idTapping1").style.display = "none";
    document.getElementById("idTapping2").style.display = "none";
    document.getElementById("idTappingGrafica1").style.display = "none";
    document.getElementById("idTappingGrafica2").style.display = "none";
    document.getElementById("btnTableTappingExcel").style.display = "none";
}

function showAbdominales() {

    document.getElementById("graficasRow").style.display = "block";
    document.getElementById("idAbdominales1").style.display = "block";
    document.getElementById("idAbdominales2").style.display = "block";
    document.getElementById("idAbdominalesGrafica1").style.display = "block";
    document.getElementById("idAbdominalesGrafica2").style.display = "block";
    document.getElementById("btnTableAbdominalesExcel").style.display = "block";

    hideNavette()
    hideSpeed()
    hideFlexionTronco()
    hideSaltoHorizontal()
    hideFlexionBrazo()
    hideTapping()
}

function hideAbdominales() {

    document.getElementById("idAbdominales1").style.display = "none";
    document.getElementById("idAbdominales2").style.display = "none";
    document.getElementById("idAbdominalesGrafica1").style.display = "none";
    document.getElementById("idAbdominalesGrafica2").style.display = "none";
    document.getElementById("btnTableAbdominalesExcel").style.display = "none";
}









/*button mostart datos del deportista*/
function viewDataUser(key, Name, Lastname, Age, Gender, Height, Weight, Hip, Waist, ICC, IMC) {


    setData(key, Name, Lastname, Age, Gender, Height, Weight, Hip, Waist, ICC, IMC);
    getDataCourseByUserId(key);


    var response = '<div class="aawp">' +
        '<input type="hidden" value=' + key + ' id="key">' +
        '<h5>Idenfiticaci?n: ' + key + '</h5>' +
        '<h5>Nombre: ' + Name + '&nbsp;' + Lastname + '</h5>' +
        '<h5>Edad: ' + Age + '</h5>' +
        '<h5>Genero: ' + Gender + '</h5>' +
        '<h5>Estatura: ' + Height + ' mts' + '</h5>' +
        '<h5>Peso: ' + Weight + ' kg' + '</h5>' +
        '<h5>Cadera: ' + Hip + ' cm' + '</h5>' +
        '<h5>Cintura: ' + Waist + ' cm' + '</h5>' +
        '<h5>ICC: ' + ICC + '</h5>' +
        '<h5>IMC: ' + IMC + '</h5>' +
        '</ul>' +
        '</div>';




    //

    update.disabled = false;
}

document.getElementById("graficasRow").style.display = 'none';

/*Cargar datos de firebase*/
var reference = db.ref('Users/');
reference.on('value', function (datas) {
    var data = datas.val();
    $.each(data, function (nodo, value) {
        var sendData = table(nodo, value.Name, value.Lastname, value.Age, value.Gender, value.Height,
            value.Weight, value.Hip, value.Waist, value.ICC, value.IMC);
        printHTML('loadTable', sendData);
    });
});



