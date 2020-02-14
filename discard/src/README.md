createDeck V1
--------------

get '/api/v1':
    returns 209 if an array of cards and an array of discard is not sent. Places the array of cards in front of the array of discard and returns 200.

    Example input:
    ```
        {
            "discard":[
                {value:4 suit:h imgSrc:"http://create-deck:4000/cards/h/4.png"},
                ... 
            ],
            "cards":[
                {value:2, suit:c,imgSrc:"http://create-deck:4000/cards/c/2.png"}
            ]
        }
    ```
    Example output:
    ```
        {
            "discard":[
                {value:2, suit:c,imgSrc:"http://create-deck:4000/cards/c/2.png"},
                {value:4 suit:h imgSrc:"http://create-deck:4000/cards/h/4.png"},
                ... 
            ]
        }
    ```