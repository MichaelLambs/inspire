function ImageController() {
	//Your ImageService is a global constructor function what can you do here if you new it up?
	imageService = new ImageService()
	var pageElem = document.getElementById('body')

	function getImage(){
		imageService.getImage(draw)
	}


	function draw(img){
		pageElem.style.backgroundImage = "url('" + img.url + "')"
	}

	getImage();

}



		// <div class="full-bg" style="background-image: url('${img.url}')">
		// 	<div id="weather">
		// 		Your Weather Template
		// 	</div>

		// 	<div id="quote">
		// 		The Quote
		// 	</div>

		// 	<div id="todo">
		// 		<form onsubmit=""></form>
		// 		A Todo List
		// 	</div>
		// </div>