const express = require('express');
const status = require('http-status')
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

app.post(uri, (req, res)=>{
	cards1 = req.body.player1;
	cards2 = req.body.player2;
	if(!cards1 || !cards2){
		return res.status(status.CONFLICT).json({"msg": "You must send 2 arrays of cards with key 'player1' and 'player2'."});
	}
	winner = 1;
	if(cards1.length<1 && cards2.length>0){
		winner = 2
	}
	if(cards2.length<1 && cards1.length<1){
		return res.status(status.CONFLICT).json({"msg": "No cards were send in the array to compare."});
	}
	if(cards2[0].value===cards1[0].value){
		winner = "war";
	}else if((cards2[0].value > cards1[0].value || cards2[0].value===1) && cards1[0].value!==1){
		winner = 2;
	}
    res.status(status.OK).json({
		"cards": cards1.concat(cards2),
		"winner_code": winner,
		"round_winner":`player${winner}`
	});
});


const httpServer = http.createServer(app);
httpServer.listen(port);
console.log(`Listening on port ${port}...`);