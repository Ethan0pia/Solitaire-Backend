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
	card1 = req.body.card1;
	card2 = req.body.card2;
	if(!card1 || !card2){
		return res.status(status.CONFLICT).json({"msg": "You must send 2 cards with the request."});
	}
	winner = 1;
	if(card2.value===card1.value){
		winner = "war";
	}else if((card2.value > card1.value || card2.value===1) && card1.value!==1){
		winner = 2;
	}
	res.status(status.OK).json({
		"round_winner": 1,
		"cards":[card1,card2]
	});
});


const httpServer = http.createServer(app);
httpServer.listen(port);
console.log(`Listening on port ${port}...`);