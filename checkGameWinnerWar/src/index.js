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

//Checks 2 decks to see if there is a winner in war
app.post(uri, (req, res)=>{
	body = req.body;
	deck1 = body.deck1;
	deck2 = body.deck2;
	discard1 = body.discard1;
	discard2 = body.discard2;
	if(!deck1 || !deck2 || !discard1 || !discard2){
		return res.status(status.CONFLICT).json({"msg": "You must send 2 decks and 2 discard piles with the request."});
	}
	if(!Array.isArray(deck1) || !Array.isArray(deck2) || !Array.isArray(discard1) || !Array.isArray(discard2)){
		return res.status(status.CONFLICT).json({"msg": "The deck and discard values must be an array of cards."});
	}
	if(discard1 && !Array.isArray(discard1)){

	}

	winnerCode = 0;
	if(deck1.length===0 && (deck2.length!==0 || discard1.length!==0) && discard1.length===0){
		winnerCode = 2;
	}else if((deck1.length!==0 || discard1.length!==0) && deck2.length===0 && discard2.length===0){
		winnerCode = 1;
	}
	body['game_winner'] = winnerCode;
    res.status(status.OK).json(body);
});

const httpServer = http.createServer(app);
httpServer.listen(port);
console.log(`Listening on port ${port}...`);