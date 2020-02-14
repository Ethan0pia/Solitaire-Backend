createDeck V1
--------------

get '/api/v1/{number of decks}':
    Returns 200 if successful. Returns 404 if number of decks is not a number.  Returns a new deck json with 52 cards * the number of decks, links to their images, value, and suit. Value is expressed in numeral value (A:1, J:11, Q:12, K:13). The deck is not shuffled.
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
get '/api/v1/cards/{suit}/{value}.png:
    returns an image of the card with that suit and value.