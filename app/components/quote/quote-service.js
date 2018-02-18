function QuoteService(){
	var url = '//bcw-getter.herokuapp.com/?url=';
	var url2 = 'http://quotesondesign.com/api/3.0/api-3.0.json';
	var apiUrl = url + encodeURIComponent(url2);

	var url3 = 'http://quotes.stormconsultancy.co.uk/random.json'
	//Do Not Edit above we have to go through the bcw-getter to access this api
	
	this.getQuote =  function(callWhenDone){
		$.get(url3, function(res){
			// res = JSON.parse(res)
			// console.log('Quote Data:', res)
			//Now What?
			callWhenDone(res)
		})
	}
}
