/**
 * 
 */
console.log(trace);
var page = require('webpage').create();
var sites = [{ "url":"http://newspoverty.geolive.ca",  "test":"http://newspoverty.geolive.ca/unitest.js" }];

phantom.onError=function(msg, trace){
	console.error( msg);
	console.error(trace);

});


page.onError=function(msg, trace){

	console.log('error: '+ msg);
	console.log(trace);
	phantom.exit(1);

};
page.onConsoleMessage = function(msg, lineNum, sourceId) {
	console.log('CONSOLE: ' + msg );
};


sites.forEach(function(site){

	var url=site.url;
	var test=site.test;


	console.log('testing: '+url+' with: '+test);


	page.open(url), function(status) {
		console.log("Status: " + status);
		if(status === "success") {

			setTimeout(function(){

				try{



					var status=page.evaluate(function(){ 

						console.log("Parsing Qunit output");
						var result={
								failed:parseInt($$('span.failed')[0].innerHTML),
								passed:parseInt($$('span.passed')[0].innerHTML),
								total:parseInt($$('span.total')[0].innerHTML),
								errors:[],
								configs:Object.keys(UIFormManager._forms)
						};

						$$('li li.fail').forEach(function(l){ result.errors.push(l.textContent); });

						return result;
					});
					console.log(JSON.stringify(status));
				}catch(e){
					console.log('Exception parsing qunit results');
				}
				phantom.exit(status.failed);
			}, 10000);
			console.log('waiting for 10s - to ensure qunit completes');


		}else{
			phantom.exit(1);
		}

	});



});