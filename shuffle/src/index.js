const express = require('express');
const status = require('http-status');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const version = 1; 
const uri = `/api/v${version}`;
const port = 4000;

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

//returns a new deck of cards. Always 200.
app.post(uri, (req, res)=>{
	if(!req.body.deck){
		return res.status(status.CONFLICT).json({"msg": "You must send a deck with the request."});
	}
	if(!Array.isArray(req.body.deck)){
		return res.status(status.CONFLICT).json({"msg": "The deck value must be an array of cards."});
	}
	let shuffledDeck = req.body.deck;
	let currentIndex = shuffledDeck.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = shuffledDeck[currentIndex];
		shuffledDeck[currentIndex] = shuffledDeck[randomIndex];
		shuffledDeck[randomIndex] = temporaryValue;
	}
    return res.status(status.OK).json({"deck": shuffledDeck});
});

//returns a new deck of cards. Always 200.
app.get(uri, (req, res)=>{
    return res.status(status.OK).json({"msg": "I shuffle cards if you send a post request with the deck."});
});

const httpServer = http.createServer(app);
httpServer.listen(port);
console.log(`Listening on port ${port}...`);