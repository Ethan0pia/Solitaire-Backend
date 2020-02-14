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
	body = req.body;
	cards = body.cards;
	discard = body.discard;
	if(!cards || !discard){
		return res.status(status.CONFLICT).json({"msg": "You must send an array of cards and an array of discard."});
	}
	body.discard = cards.concat(discard);
	delete body.cards;
	res.status(status.OK).json(body);
});


const httpServer = http.createServer(app);
httpServer.listen(port);
console.log(`Listening on port ${port}...`);