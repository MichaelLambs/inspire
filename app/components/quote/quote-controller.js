function QuoteController(){

	quoteService = new QuoteService()
	var quoteElem = document.getElementById('quote')

	// quoteService.getQuote(function(quote){
	// 	console.log('What is the quote', quote)
	// })

	function getQuote() {
		quoteService.getQuote(draw);
	}

	function draw(quote) {
		var template = `

		<div class="quote-holder">
			<div>
				<h2 id="show-author">"${quote.quote}"</h2>
			</div>
			<div id="author" class="hidden">
				<h5>- <em>${quote.author}</em></h5>
			</div>
		</div>

		`
		quoteElem.innerHTML = template;
		var showAuthorElem = document.getElementById('show-author')
		var authorElem = document.getElementById('author')

		showAuthorElem.addEventListener('mouseover', function (event) {
			authorElem.classList.remove('hidden')
		})

		showAuthorElem.addEventListener('mouseleave', function (event) {
			authorElem.classList.add('hidden')
		})
		
	}


	getQuote()

}
