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

app.post(uri, (req, res)=>{
	body = req.body;
    if(!body.deck){
		return res.status(status.CONFLICT).json({"msg": "You must send a deck with the request."});
	}
	if(!Array.isArray(body.deck)){
		return res.status(status.CONFLICT).json({"msg": "The deck value must be an array of cards."});
	}
	if(!body.discard){
		return res.status(status.CONFLICT).json({"msg": "You must send a deck with the request."});
	}
	if(!Array.isArray(body.discard)){
		return res.status(status.CONFLICT).json({"msg": "The deck value must be an array of cards."});
	}
	body.deck = (body.discard.splice(0,body.discard.length)).concat(body.deck);
    res.status(status.OK).send(body);
});


const httpServer = http.createServer(app);
httpServer.listen(port);
console.log(`Listening on port ${port}...`);