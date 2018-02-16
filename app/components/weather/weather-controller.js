function WeatherController(){

	var weatherService = new WeatherService();
	
	var weatherElem = document.getElementById('weather')


	// weatherService.getWeather(function(weather){
	// 	console.log(weather);
	// 	//What can you do with this weather object?
	// })

	function getWeather(){
		weatherService.getWeather(draw)
	}

	function draw(res, weatherInF){
		var weather = res.weather
		var template = `
		<div class="weather-holder">
			<div>
				<h2>Loc: ${res.name}</h2>
				<h3>Temp: ${weatherInF} | ${weather[0].main}</h3>
				<h4></h4>
			</div>

		</div>
	
		`
		weatherElem.innerHTML = template
	}

	getWeather()

}
