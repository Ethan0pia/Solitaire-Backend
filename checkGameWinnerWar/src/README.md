checkGameWinnerWar V1
--------------

post '/api/v1':
    Returns 409 if you do not send "deck1", "deck2", "discard1", and "discard2" key in the json or if they are not arrays. Returns 200 if successful. Adds or changes the existing game_winner key from body to the current status.
    Example Input:
    ```
        {
            "deck1":[
                {value:2, suit:c,imgSrc:"http://create-deck:4000/cards/c/2.png"},
                {value:4 suit:h imgSrc:"http://create-deck:4000/cards/h/4.png"},
                ... 
            ],
            "discard1":[],
            "deck2":[],
            "discard2":[]
        }
    ```
    Example Output:
    ```
        {
            "deck1":[
                {value:2, suit:c,imgSrc:"http://create-deck:4000/cards/c/2.png"},
                {value:4 suit:h imgSrc:"http://create-deck:4000/cards/h/4.png"},
                ... 
            ],
            "discard1":[],
            "deck2":[],
            "discard2":[],
            "game_winner": 1
        }
    ```