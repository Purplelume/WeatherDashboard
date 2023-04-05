// Variables selecting ids
var searchButton = $('#searchButton');
var input = document.querySelector('#placeFinder');
var cityName = document.querySelector('#cityName');
var temperature = document.querySelector('#temperature');
var temperature1 = document.querySelector('#temperature1')
var temperature2 = document.querySelector('#temperature2')
var temperature3 = document.querySelector('#temperature3')
var temperature4 = document.querySelector('#temperature4')
var temperature5 = document.querySelector('#temperature5')
var wind = document.querySelector('#wind');
var wind1 = document.querySelector('#wind1');
var wind2 = document.querySelector('#wind2');
var wind3 = document.querySelector('#wind3');
var wind4 = document.querySelector('#wind4');
var wind5 = document.querySelector('#wind5');
var humidity = document.querySelector('#humidity');
var humidity1 = document.querySelector('#humidity1');
var humidity2 = document.querySelector('#humidity2');
var humidity3 = document.querySelector('#humidity3');
var humidity4 = document.querySelector('#humidity4');
var humidity5 = document.querySelector('#humidity5');
var buttonList = $('#buttonList');
let createImage= document.createElement('img');
let createImage2= document.createElement('img');
let createImage3= document.createElement('img');
var cityHistories = $(JSON.parse(localStorage.getItem('saved')));

// City name as a button created
userInput();
function userInput() {
    // Prevent same city button to be created
    cityHistories.sort();
    for (var i = 0; i < cityHistories.length; i++){
        if(cityHistories[i] === cityHistories[i -1]){
            cityHistories.splice(i, 1);
            i--;
        }
    }
 createButton();
}

function createButton(){
    buttonList.children().remove();
    for(var i = 0; i <cityHistories.length; i++){
        var button = document.createElement("button");
        button.textContent = (cityHistories[i]);
        button.setAttribute('id', 'uniqueB');
        document.getElementById('buttonList').appendChild(button);
    }
}

searchButton.on('click', function () {

    // Use api to get City weather conditions
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=f0424a10b0d694430951191baf24a766&units=metric')
        .then(response => response.json())
        .then(data => {
            var cityVal = data['name'];
            var temperatureVal = data['main']['temp'];
            var windVal = data['wind']['speed'];
            var humidityVal = data['main']['humidity'];
            var imageVal = data.weather[0].icon;

            cityName.innerHTML = (cityVal + " ");
            temperature.innerHTML = ("Temperature: " + temperatureVal + " °C");
            wind.innerHTML = ("Wind: " + windVal + " mph");
            humidity.innerHTML = ("Humidity: " + humidityVal);

            createImage.src= "http://openweathermap.org/img/wn/" + imageVal + ".png";
            
            document.getElementById('index').append(createImage);

            cityHistories.push(cityVal);
            localStorage.setItem('saved', JSON.stringify(cityHistories));
            userInput(); 
        })

    // Display the next five days in Celsius
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + input.value + '&appid=f0424a10b0d694430951191baf24a766&units=metric')
        .then(response => response.json())
        .then(data => {
            // Gets the weather icon and city details
                var image1 = 'https://openweathermap.org/img/w/' + data.list[0].weather[0].icon+ '.png';
                $('#image1').attr('src', image1);
                temperature1.innerHTML = 'Temperature: ' + Number(data.list[0].main.temp).toFixed(0) + "°C";
                wind1.innerHTML = 'Wind: ' + Number(data.list[0].wind.speed) + " Mph";
                document.getElementById("humidity1").innerHTML = 'Humidity: ' + Number(data.list[0].main.humidity);
                document.getElementById("date1").innerHTML = (data.list[0].dt_txt);

                var image2 = 'https://openweathermap.org/img/w/' + data.list[8].weather[0].icon+ '.png';
                $('#image2').attr('src', image2);
                temperature2.innerHTML = 'Temperature: ' + Number(data.list[8].main.temp).toFixed(0) + "°C";
                wind2.innerHTML = 'Wind: ' + Number(data.list[8].wind.speed) + " Mph";
                humidity2.innerHTML = 'Humidity: ' + Number(data.list[8].main.humidity);
                document.getElementById("date2").innerHTML = (data.list[8].dt_txt);

                var image3 = 'https://openweathermap.org/img/w/' + data.list[16].weather[0].icon+ '.png';
                $('#image3').attr('src', image3);
                temperature3.innerHTML = 'Temperature: ' + Number(data.list[16].main.temp).toFixed(0) + "°C";
                wind3.innerHTML = 'Wind: ' + Number(data.list[16].wind.speed) + " Mph";
                humidity3.innerHTML = 'Humidity: ' + Number(data.list[16].main.humidity);
                document.getElementById("date3").innerHTML = (data.list[16].dt_txt);

                var image4 = 'https://openweathermap.org/img/w/' + data.list[24].weather[0].icon+ '.png';
                $('#image4').attr('src', image4);
                temperature4.innerHTML = 'Temperature: ' + Number(data.list[24].main.temp).toFixed(0) + "°C";
                wind4.innerHTML = 'Wind: ' + Number(data.list[24].wind.speed) + " Mph";
                humidity4.innerHTML = 'Humidity: ' + Number(data.list[24].main.humidity);
                document.getElementById("date4").innerHTML = (data.list[24].dt_txt);

                var image5 = 'https://openweathermap.org/img/w/' + data.list[32].weather[0].icon+ '.png';
                $('#image5').attr('src', image5);
                temperature5.innerHTML = 'Temperature: ' + Number(data.list[32].main.temp).toFixed(0) + "°C";
                wind5.innerHTML = 'Wind: ' + Number(data.list[32].wind.speed) + " Mph";
                humidity5.innerHTML = 'Humidity: ' + Number(data.list[32].main.humidity);
                document.getElementById("date5").innerHTML = (data.list[32].dt_txt);
        })
});

// Display the cities by clicking on the button with the city name
buttonList.on('click', '#uniqueB' , function (event) { 
    event.stopPropagation();
    event.stopImmediatePropagation();
     var city = $(this).text();
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=f0424a10b0d694430951191baf24a766&units=metric')
    .then(response => response.json())
    .then(data => {
        var cityVal = data['name'];
        var temperatureVal = data['main']['temp'];
        var windVal = data['wind']['speed'];
        var humidityVal = data['main']['humidity'];
        var imageVal = data.weather[0].icon;

        cityName.innerHTML = (cityVal + " ");
        temperature.innerHTML = ("Temperature: " + temperatureVal + " °C");
        wind.innerHTML = ("Wind: " + windVal + " mph");
        humidity.innerHTML = ("Humidity: " + humidityVal);

        createImage.src= "http://openweathermap.org/img/wn/" + imageVal + ".png";
        
        document.getElementById('index').append(createImage);

        cityHistories.push(cityVal);
        localStorage.setItem('saved', JSON.stringify(cityHistories));
        userInput(); 
    })

fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=f0424a10b0d694430951191baf24a766&units=metric')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var image1 = 'https://openweathermap.org/img/w/' + data.list[0].weather[0].icon+ '.png';
        $('#image1').attr('src', image1);
        temperature1.innerHTML = 'Temperature: ' + Number(data.list[0].main.temp).toFixed(0) + "°C";
        wind1.innerHTML = 'Wind: ' + Number(data.list[0].wind.speed) + " Mph";
        document.getElementById("humidity1").innerHTML = 'Humidity: ' + Number(data.list[0].main.humidity);
        document.getElementById("date1").innerHTML = (data.list[0].dt_txt);

        var image2 = 'https://openweathermap.org/img/w/' + data.list[8].weather[0].icon+ '.png';
        $('#image2').attr('src', image2);
        temperature2.innerHTML = 'Temperature: ' + Number(data.list[8].main.temp).toFixed(0) + "°C";
        wind2.innerHTML = 'Wind: ' + Number(data.list[8].wind.speed) + " Mph";
        humidity2.innerHTML = 'Humidity: ' + Number(data.list[8].main.humidity);
        document.getElementById("date2").innerHTML = (data.list[8].dt_txt);

        var image3 = 'https://openweathermap.org/img/w/' + data.list[16].weather[0].icon+ '.png';
        $('#image3').attr('src', image3);
        temperature3.innerHTML = 'Temperature: ' + Number(data.list[16].main.temp).toFixed(0) + "°C";
        wind3.innerHTML = 'Wind: ' + Number(data.list[16].wind.speed) + " Mph";
        humidity3.innerHTML = 'Humidity: ' + Number(data.list[16].main.humidity);
        document.getElementById("date3").innerHTML = (data.list[16].dt_txt);

        var image4 = 'https://openweathermap.org/img/w/' + data.list[24].weather[0].icon+ '.png';
        $('#image4').attr('src', image4);
        temperature4.innerHTML = 'Temperature: ' + Number(data.list[24].main.temp).toFixed(0) + "°C";
        wind4.innerHTML = 'Wind: ' + Number(data.list[24].wind.speed) + " Mph";
        humidity4.innerHTML = 'Humidity: ' + Number(data.list[24].main.humidity);
        document.getElementById("date4").innerHTML = (data.list[24].dt_txt);

        var image5 = 'https://openweathermap.org/img/w/' + data.list[32].weather[0].icon+ '.png';
        $('#image5').attr('src', image5);
        temperature5.innerHTML = 'Temperature: ' + Number(data.list[32].main.temp).toFixed(0) + "°C";
        wind5.innerHTML = 'Wind: ' + Number(data.list[32].wind.speed) + " Mph";
        humidity5.innerHTML = 'Humidity: ' + Number(data.list[32].main.humidity);
        document.getElementById("date5").innerHTML = (data.list[32].dt_txt);
    })
});