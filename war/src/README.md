restack V1
--------------

post '/api/v1/':
    Requires 2 arrays of cards. Returns 409 if 2 arrays are not sent. Arrays must be keyed with "player1" "player2". Returns an array with all the cards in 1 array and the player that won.
    Sample input:
    ```
        {
            "player1":[
                {value:4 suit:h imgSrc:"http://create-deck:4000/cards/h/4.png"},
                ... 
            ],
            "player2":[
                {value:2, suit:c,imgSrc:"http://create-deck:4000/cards/c/2.png"},
                ...
            ]
        }
    ```
        Sample output:
    ```
        {
            "cards":[
                {value:2, suit:c,imgSrc:"http://create-deck:4000/cards/c/2.png"},
                {value:4 suit:h imgSrc:"http://create-deck:4000/cards/h/4.png"},
                ... 
            ],
            "winner": "player 1",
            "winner_code": 1
        }
    ```