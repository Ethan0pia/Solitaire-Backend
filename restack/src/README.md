restack V1
--------------

post '/api/v1/':
    Requires a deck array. Returns 409 if no deck and discard array is sent. Returns body with newly stacked deck and discard empty.
    Sample input:
    ```
        {
            "deck":[
                {value:4 suit:h imgSrc:"http://create-deck:4000/cards/h/4.png"},
                ... 
            ],
            "discard":[
                {value:2, suit:c,imgSrc:"http://create-deck:4000/cards/c/2.png"}
            ]
        }
    ```
        Sample output:
    ```
        {
            "deck":[
                {value:2, suit:c,imgSrc:"http://create-deck:4000/cards/c/2.png"},
                {value:4 suit:h imgSrc:"http://create-deck:4000/cards/h/4.png"},
                ... 
            ],
            "discard": []
        }
    ```