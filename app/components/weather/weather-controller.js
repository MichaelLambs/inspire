function WeatherController(){

	var weatherService = new WeatherService();
	
	var weatherElem = document.getElementById('weather')


	// weatherService.getWeather(function(weather){
	// 	console.log(weather);
	// 	//What can you do with this weather object?
	// }) ${weather[0].main}

	function getWeather(){
		weatherService.getWeather(draw)
	}

	function draw(res, weatherInF){
		var weather = res.weather
		var weatherIcon = ''

		if(weather[0].main == "Clear"){
			weatherIcon = 'fa fa-sun-o'
		} else if(weather[0].main == "Clouds"){
			weatherIcon = 'fa fa-cloud'
		} else if(weather[0].main == "Snow"){
			weatherIcon = 'fa fa-snowflake-o'
		} else if(weather[0].main == "Rain"){
			weatherIcon = 'fa fa-tint'
		}

		var template = `
		<div></div>
		<div class="weather-holder">
			<div>
				<h2>${res.name}</h2>
				<h3>Temp: ${weatherInF}&deg;F | <span><i class="${weatherIcon}" aria-hidden="true"></i></span></h3>
				<h4></h4>
			</div>

		</div>
	
		`
		weatherElem.innerHTML = template
	}

	getWeather()

}
