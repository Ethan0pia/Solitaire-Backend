compare V1
--------------

post '/api/v1':
    Returns 409 if you do not send 2 cards with the request. Returns 200 if successful. Returns the winner and an array containing both cards.
    Example Input:
    ```
        {
            "card1":{value:2, suit:c,imgSrc:"http://create-deck:4000/cards/c/2.png"},
            "card2":{value:4 suit:h imgSrc:"http://create-deck:4000/cards/h/4.png"}
        }
    ```
    Example Output:
    ```
        {
            "round_winner": 1,
            "cards":[{value:2, suit:c,imgSrc:"http://create-deck:4000/cards/c/2.png"},
                {value:4 suit:h imgSrc:"http://create-deck:4000/cards/h/4.png"}]
        }
    ```