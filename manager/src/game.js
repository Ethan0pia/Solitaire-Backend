const mongoose = require('mongoose');

//game schema
let gameSchema = mongoose.Schema({
    gameType:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default:Date.now
    }
}, { strict: false });

let GameList = mongoose.exports = mongoose.model('gamelists', gameSchema);

//Get game
module.exports.getGameById = function(id, callback){
    GameList.findById(id, callback);
    //GameList.find({}, callback);
}

//Add game
module.exports.addGame = function(game, callback){
    console.log(game);
    if(game['_id'] && GameList.findById(game['_id'])){
        let query = {"_id": game._id};
        GameList.replaceOne(query, game, callback);
    }else{
        return GameList.create(game, callback);
    }
}

//delete Game
module.exports.deleteGame = function(id, callback){
    let query = {_id:id};
    GameList.remove(query, callback);
}