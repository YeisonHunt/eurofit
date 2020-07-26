var db = firebase.database();

var update = document.getElementById('update');
update.disabled = false;


const rootRef = db.ref('Users');

// rootRef.orderByKey().on('value', snapshot => {
//     console.log(snapshot.val())
// })


function getDataCourseByUserId(userId){

    var starCountRef = firebase.database().ref('Users/'+userId);
    starCountRef.on('value', function(snapshot) {
    //console.log(snapshot.val());
    var courseNavette = snapshot.val();
    console.log(courseNavette.testcoursenavette);


    // Arrays para Course Navette
    var infoArray = []
    var distances = [0]
    var times = ['0:00']

    

    for (const key in courseNavette.testcoursenavette) {
        if (courseNavette.testcoursenavette.hasOwnProperty(key)) {
            const element = courseNavette.testcoursenavette[key];

            if(element.distance && element.finaltime && element.straight){
                var toAdd = {
                    distance: element.distance,
                    finaltime: element.finaltime,
                    straight:  element.straight
                }

                infoArray.push(toAdd)
                distances.push(element.distance)
                times.push(element.finaltime)

            }
            
        }
    }

    // Arrays para Vel510
    var speedTimes = ['0:00']
    var speedDistances = [0]

    for (const key in courseNavette.testspeed) {
        if (courseNavette.testspeed.hasOwnProperty(key)) {
            var element = courseNavette.testspeed[key];

            if(element.distance && element.finaltime){

                speedDistances.push(element.distance)
                speedTimes.push(element.finaltime)

            }
            
        }
    }



    console.log(distances);
    console.log(times);

    graficarCourseNavette(distances,times)
    graficarvel510(speedDistances,speedTimes)


    });
}

function graficarvel510(distances,times){

    var ctx = document.getElementById('speedChart').getContext('2d');

    var dataCourvette = {}
    var labelsCourvette = []
    var datasetCourvette = {}
    var graphTitle = ''

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: times,
            datasets: [{
                fill:false,
                label: 'Vel. 5 x 10 mts',
                backgroundColor: 'rgb(99, 179, 237)',
                borderColor: 'rgb(43, 108, 176)',
                data: distances
            }]
        },
    
        // Configuration options go here
        options: {}
    });
}

function graficarCourseNavette(distances,times){
    
    var ctx = document.getElementById('myChart').getContext('2d');

    var dataCourvette = {}
    var labelsCourvette = []
    var datasetCourvette = {}
    var graphTitle = ''

    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: times,
            datasets: [{
                fill:false,
                label: 'Course Navette',
                backgroundColor: 'rgb(99, 179, 237)',
                borderColor: 'rgb(43, 108, 176)',
                data: distances
            }]
        },
    
        // Configuration options go here
        options: {}
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

/*Mostrar datos Course Navette*/
function onClickCourseNavette() {
    var key = value("key");

    var reference = db.ref('Users/' + key + '/testcoursenavette');
    reference.on('value', function (course) {
        var datacourse = course.val();
        $.each(datacourse, function (nodo, value) {
            var sendData = tablecourse(nodo, value.distance, value.straight, value.finaltime);
            printHTML('loadcoursenavette', sendData);
        });
    });

    function tablecourse(key, distance, straight, finaltime) {

        //distance = distance.replace(/[undefined]/, '');

        return (
            '<tr>' +
            '<td>' + key + '</td>' +
            '<td id="distance">' + distance + ' ' + 'mts' + '</td>' +
            '<td>' + straight + '</td>' +
            '<td id="finaltime">' + finaltime + ' ' + 'mm:ss' + '</td>'
        );
    }
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

/*Grafica velocidad 5x10 */
function onClickGraphSpeed() {
    //var distance = value("distance");
    //var finaltime = value("finaltime");
    new Morris.Line({
        // ID of the element in which to draw the chart.
        element: 'GraphSpeed',
        // Chart data records -- each entry in this array corresponds to a point on
        // the chart.
        data: [
            { Test: '1', Time: 67 },
            { Test: '2', Time: 80 },
            { Test: '3', Time: 92 },
            { Test: '4', Time: 105 },
            { Test: '5', Time: 65 }
        ],
        // The name of the data record attribute that contains x-values.
        xkey: 'Test',
        // A list of names of data record attributes that contain y-values.
        ykeys: ['Time'],
        // Labels for the ykeys -- will be displayed when you hover over the
        // chart.
        labels: ['Vel. 5x10'],
        resize: true,
        lineColors: ['#C14D9F']
    });
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

function setData(key, Name, Lastname, Age, Gender, Height, Weight, Hip, Waist, ICC, IMC){
    document.getElementById('idIdentificacion').innerHTML = key
    document.getElementById('idDeportista').innerHTML = Name +" "+ Lastname
    document.getElementById('idEdad').innerHTML = Age
    document.getElementById('idGenero').innerHTML = Gender
    document.getElementById('idEstatura').innerHTML = Height
    document.getElementById('idPeso').innerHTML = Weight
    document.getElementById('idCadera').innerHTML = Hip
    document.getElementById('idCintura').innerHTML = Waist
    document.getElementById('idICC').innerHTML = ICC
    document.getElementById('idIMC').innerHTML = IMC
}

function clearData(){
    document.getElementById('idDocument').innerHTML = "?"
}

/*button mostart datos del deportista*/
function viewDataUser(key, Name, Lastname, Age, Gender, Height, Weight, Hip, Waist, ICC, IMC) {
    

    setData(key, Name, Lastname, Age, Gender, Height, Weight, Hip, Waist, ICC, IMC);
    getDataCourseByUserId(key);

    var response = '<div class="aawp">' +
        '<input type="hidden" value=' + key + ' id="key">' +
        '<h5>Idenfiticación: ' + key + '</h5>' +
        '<h5>Nombre: ' + Name + '&nbsp;' + Lastname + '</h5>' +
        '<h5>Edad: ' + Age + '</h5>' +
        '<h5>Genero: ' + Gender + '</h5>' +
        '<h5>Estatura: ' + Height + ' mts' + '</h5>' +
        '<h5>Peso: ' + Weight + ' kg' + '</h5>' +
        '<h5>Cadera: ' + Hip + ' cm' + '</h5>' +
        '<h5>Cintura: ' + Waist + ' cm' + '</h5>' +
        '<h5>ICC: ' + ICC + '</h5>' +
        '<h5>IMC: ' + IMC + '</h5>' +
        '</ul>'+
        '</div>';

    

    inHTML('editData', response);
    update.disabled = false;
}

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



