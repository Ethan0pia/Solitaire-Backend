const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const status = require('http-status');

const got = require('got');

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

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

const port = 4000;
const version = 1;
const apiUri = `/api/v${version}`;

const createDeckDomain = 'http://create-deck:4000/api/v1';
const managerDomain = 'http://manager:4000/api/v1';
const shuffleDomain = 'http://shuffle:4000/api/v1';
const splitDeckDomain = 'http://split-deck:4000/api/v1';

const warWinnerDomain = 'http://check-game-winner-war:4000/api/v1';
const compareDomain = 'http://compare:4000/api/v1';
const discardDomain = 'http://discard:4000/api/v1';
const drawCardDomain = 'http://draw-card:4000/api/v1';
const restackDomain = 'http://restack:4000/api/v1';
const warDomain = 'http://war:4000/api/v1';

const getWarGameUri = apiUri + '/war';
app.get( `${getWarGameUri}/:_id`, (req, res) => {
	got.get(`${managerDomain}/${req.params._id}`).then((response) => {
		if(!response.gameType && response.gameType==="war"){
			return response;
		}
		return got.get(`${createDeckDomain}/1`).then((response)=>{
			got.post(shuffleDomain,{
				body:response,
				json: true
			})
		}).then((response)=>{
			got.post(splitDeckDomain,{
				body:response,
				json: true
			})
		}).then((response)=>{
			return res.status(status.OK).json(response);
		})
	}).catch((err) => {
		return res.status(status.INTERNAL_SERVER_ERROR).json(err);
	})
});

app.get( getWarGameUri, (req, res) => {
	got.get(`${createDeckDomain}/1`, {json: true}).then((response)=>{
			return got.post(shuffleDomain, {
				body: response.body,
				json: true
			});
		}).then((response)=>{
			return got.post(splitDeckDomain,{
				body: response.body,
				json: true
			});
		}).then((response)=>{
			return res.status(status.OK).json(response.body);
	}).catch((err) => {
		return res.status(status.INTERNAL_SERVER_ERROR).json(err);
	})
});

const httpServer = http.createServer(app);
httpServer.listen(port);