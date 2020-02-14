shuffle V1
--------------

post '/api/v1':
    Returns 200 if successful. Returns 409 if no deck is detected. Returns a shuffled deck based on the inputted deck. Must send a json object with a "deck" key that contains an array of card elements.
    Sample input:
    ```
        {
            "deck":[
                {value:1, suit:c,imgSrc:"http://create-deck:4000/cards/c/1.png"},
                {value:2 suit:c imgSrc:"http://create-deck:4000/cards/c/2.png"},
                ... 
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
            ]
        }
    ```