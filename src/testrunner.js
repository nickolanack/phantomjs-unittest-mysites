/**
 * 
 */


var sites = [{ "url":"http://newspoverty.geolive.ca",  "test":"http://newspoverty.geolive.ca/unitest.js" }];
console.log('Hello World');


var fs=require('fs');
//phantom.exit(0);

sites.forEach(function(site){

	var url=site.url;
	var test=site.test;


	console.log('testing: '+url+' with: '+test);

	var page = require('webpage').create();
	page.onError=function(msg, trace){

		console.error('error: '+ msg);
		console.error(trace);
		//phantom.exit(1);

	};
	page.onConsoleMessage = function(msg, lineNum, sourceId) {
		console.log('CONSOLE: ' + msg );
	};





	page.open(url, function(status) {
		console.log("Status: " + status);
		if(status === "success") {


			page.evaluate(function(){
				window.addEventListener('domready',function(){
					document.head.appendChild(
							document.createElement('<script src="http://code.jquery.com/qunit/qunit-1.19.0.js" type="text/javascript"></script>'));
					document.head.appendChild(
							document.createElement('<link rel="stylesheet" href="http://code.jquery.com/qunit/qunit-1.19.0.css" type="text/css" />'));
					document.head.appendChild(
							document.createElement('<script src="'+test+'" type="text/javascript"></script>'));
				});

			});


			setTimeout(function(){
				var path=url.replace('://', '>>').replace('/','>');
				fs.write(path, page.content, 'w');
				
				
			}, 10000);
			
			
			
			console.log('waiting for 10s - to ensure qunit completes');


		}else{
			phantom.exit(1);
		}

	});



});