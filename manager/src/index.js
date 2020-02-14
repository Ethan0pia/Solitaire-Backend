const express = require('express');
const status = require('http-status');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
const mongoose = require('mongoose');
const Game = require('./game');
mongoose.connect('mongodb://root:password@db/games?authSource=admin');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function callback(){
	console.log("CONNECTED");
});

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

//http://localhost:4000/api/v1/jkashdfuiwhe
app.get(`${uri}/:_id`, (req, res)=>{
	let id = req.params._id;
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		Game.getGameById(id, function(err, game){
			if(err){
				throw err;
			}
			console.log(game);
			res.status(status.OK).json(game);
		});
	}else{
		res.status(status.CONFLICT).json({"msg":`${id} is not a valid id.`});
	}
});

app.post(uri, (req, res)=>{
	game = req.body;
	id = game._id;
	if(!game){
		res.status(status.CONFLICT).json({"msg":"No game object was sent."})
	}
	Game.addGame(game ,function(err, game){
        if(err){
            throw err;
		}
		if(game['_id']){
			id = game._id;
		}
        Game.getGameById(id, function(err, finalGame){
			if(err){
				throw err;
			}
			res.status(status.OK).json(finalGame);
		});
    });
});

app.delete(`${uri}/:_id`, (req, res)=>{
	id = req.params._id;
	Game.deleteGame(id ,function(err, game){
        if(err){
            throw err;
		}
		res.status(status.OK).json(game);
    });
});

const httpServer = http.createServer(app);
httpServer.listen(port);
console.log(`Listening on port ${port}...`);