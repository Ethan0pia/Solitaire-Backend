splitDeck V1
--------------

post '/api/v1':
    Returns 200 if successful. Returns 409 if no deck is detected. Returns 2 decks by splitting the inputted deck in the middle. Must send a json object with a "deck" key that contains an array of card elements.
    Sample Input:
    ```
        {
            "deck":[
                {value:2, suit:c,imgSrc:"http://create-deck:4000/cards/c/2.png"},
                {value:4 suit:h imgSrc:"http://create-deck:4000/cards/h/4.png"},
                ... 
            ]
        }
    ```
    Sample Output:
    ```
        {
            "deck1":[
                {value:2, suit:c,imgSrc:"http://create-deck:4000/cards/c/2.png"},
                {value:4 suit:h imgSrc:"http://create-deck:4000/cards/h/4.png"},
                ... 
            ]
            "deck2":[
                {value:5, suit:c,imgSrc:"http://create-deck:4000/cards/c/5.png"},
                {value:8 suit:h imgSrc:"http://create-deck:4000/cards/h/8.png"},
                ... 
            ]
        }
    ```