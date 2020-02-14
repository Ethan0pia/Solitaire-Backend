const express = require('express');
const status = require('http-status');
const http = require('http');
const app = express();
app.use(express.json());
var fs = require('fs');

const version = 1;
const uri = `/api/v${version}`;
const external_fqdn = process.env.EXTERNAL_FQDN || "localhost";
const port = 4000;

app.use(`${uri}/cards`, express.static(__dirname + '/cards'));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept',
	);
	res.header(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, PUT, POST, PATCH, DELETE, HEAD',
	);
	res.header('Access-Control-Allow-Credentials', 'true');

	if ('OPTIONS' === req.method) {
		res.sendStatus(204);
	} else {
		next();
	}
});

var convertImage = function(file){
	var bitmap = fs.readFileSync(__dirname + file);
	return new Buffer(bitmap).toString('base64');
}

//returns a new deck of cards.
app.get(`${uri}/:number`, (req, res)=>{
	var newDeck = [];
	if(isNaN(req.params['number'])){
		return res.status(status.CONFLICT).json({"msg": `You did not send a number of decks to create. try ${uri}/{number of decks to create}.`});
	}
	if(req.params['number']<1){
		return res.status(status.CONFLICT).json({"msg": `We cannot create 0 decks. Please try a different number.`});
	}
	var suits = ['d','s','c','h'];
	for(var suit of suits){
		for(var i=1;i<=13;i++){
			for(y=0;y<req.params['number'];y++){
				var img = convertImage(`/cards/${suit}/${i}.png`);
				newDeck.push({
					"value": i,
					"suit": suit,
					"imgSrc": img
				});
			}
		}
	}
    return res.status(status.OK).json({"deck": newDeck});
});
const httpServer = http.createServer(app);
httpServer.listen(port);
console.log(`Listening on port ${port}...`);