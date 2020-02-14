manager V1
--------------

get '/api/v1/{}':
    returns 409 if game with that id is not found. 
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

post '/api/v1/':
    returns 409 if game object was not sent with request. Returns 200 if successful. Replaces the existing game with the information sent or creates a new object and returns the game id.
    Sample input:
    ```
        {
            "deck":[
                {value:2, suit:c,imgSrc:"http://create-deck:4000/cards/c/2.png"},
                {value:4 suit:h imgSrc:"http://create-deck:4000/cards/h/4.png"},
                ... 
            ]
        }
    ```
    Sample output:
    ```
        {
            "_id": "5bef28ae78b7a008a1cee227",
            "deck":[
                {value:2, suit:c,imgSrc:"http://create-deck:4000/cards/c/2.png"},
                {value:4 suit:h imgSrc:"http://create-deck:4000/cards/h/4.png"},
                ... 
            ]
        }
    ```

delete '/api/v1/{}':
    returns 409 if id is not defined. Returns 200 if successfully deleted.
    Sample output:
    ```
        {
            "n": 1,
            "ok": 1
        }
    ```