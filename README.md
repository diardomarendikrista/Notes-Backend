# Notes-Backend

API Server for note app by Diardo.
<br /><br />

# DOCUMENTATION

## List available routes :

## # Users
- POST /login
- POST /register
- GET /users (need admin roles)
- DELETE /users/:id (need admin roles, USE IT WITH YOUR OWN RISK)

## # Notes
- POST /notes
- GET /notes
- GET /notes/id
- PUT /notes/id
- DELETE /notes/id
<br /><br />

# Users
- ### Login
  endpoint: `POST /login`

  #### _Request_
  * body
  ```js
  {
    "email": string,
    "password": string
  }
  ```
  #### _Response_
  * 200 OK
  ```js
  {
    "access_token": string,
  }
  ```  
  #### Fail Response :
    * 400 Bad Request   
  
  Fail response detail at bottom <br/><br/>


- ### Register
  endpoint: `POST /register`

  #### _Request_
  * body
  ```js
  {
    "name": string,
    "email": string,
    "password": string
  }
  ```
  #### _Response_
  * 201 OK
  ```js
  {
    "name": string,
    "email": string,
    "password": string
  }
  ```  
  #### Fail Response :
    * 400 Bad Request   
  
  Fail response detail at bottom <br/><br/>

- ### Get All User
  endpoint: `GET /users`

  #### _Request_
  * headers
  ```js
  {
    "access_token": string,
  }
  ```

  #### _Response_
  * 200 OK
  ```js
  {
      "id": <given>,
      "name": string,
      "email": string,
      "role": string,
      "createdAt": date,
      "updatedAt": date,
  }
  ```  
  #### Fail Response :
    * 401 Unauthorized
    * 500 Internal Server Error  
    
  Fail response detail at bottom <br/><br/>

- ### Delete User
  endpoint: `DELETE /users`

  #### _Request_
  * headers
  ```js
  {
    "access_token": string,
  }
  ```

  #### _Response_
  * 200 OK
  ```js
  {
      "message" : string,
  }
  ```  
  #### Fail Response :
    * 401 Unauthorized
    * 500 Internal Server Error  
    
  Fail response detail at bottom <br/><br/>


# Notes
- ### Get all notes (by user login)
  endpoint: `GET /notes`

  #### _Request_
  * headers
  ```js
  {
    "access_token": string,
  }
  ```
  #### _Response_
  * 200 OK
  ```js
  {
    "id": <given>,
    "title": string,
    "note": string,
    "tag": string,
    "status": string,
    "user_id": integer (FK),
    "createdAt": date,
    "updatedAt": date,
  }
  ```  
  #### Fail Response :
    * 401 Unauthorized   
    * 500 Internal Server Error   
  
  Fail response detail at bottom <br/><br/>

- ### Get note by ID
  endpoint: `GET /notes/:id`

  #### _Request_
  * headers
  ```js
  {
    "access_token": string,
  }
  ```
  * params
  ```js
  {
    "id": string,
  }
  ```
  #### _Response_
  * 200 OK
  ```js
  {
    "id": <given>,
    "title": string,
    "note": string,
    "tag": string,
    "status": string,
    "user_id": integer (FK),
    "createdAt": date,
    "updatedAt": date,
  }
  ```  
  #### Fail Response :
    * 401 Unauthorized   
    * 500 Internal Server Error   

  Fail response detail at bottom <br/><br/>

- ### Add New Note
  endpoint: `POST /notes`

  #### _Request_
  * headers
  ```js
  {
    "access_token": string,
  }
  ```
  * body
  ```js
  {
    "title": string,
    "note": string,
    "tag": string,
    "status": string,
  }
  ```
  #### _Response_
  * 200 OK
  ```js
  {
    "id": <given>,
    "title": string,
    "note": string,
    "tag": string,
    "status": string,
    "user_id": integer (FK),
    "createdAt": date,
    "updatedAt": date,
  }
  ```  
  #### Fail Response :
    * 400 Bad Request   
    * 500 Internal Server Error   

  Fail response detail at bottom <br/><br/>

- ### Edit / Update Note
  endpoint: `PUT /notes/:id`

  #### _Request_
  * headers
  ```js
  {
    "access_token": string,
  }
  ```
  * params
  ```js
  {
    "id": string,
  }
  ```
  * body
  ```js
  {
    "title": string,
    "note": string,
    "tag": string,
    "status": string,
  }
  ```
  #### _Response_
  * 200 OK
  ```js
  {
    "id": <given>,
    "title": string,
    "note": string,
    "tag": string,
    "status": string,
    "user_id": integer (FK),
    "createdAt": date,
    "updatedAt": date,
  }
  ```  
  #### Fail Response :
    * 400 Bad Request   
    * 401 Unauthorized   
    * 500 Internal Server Error   

  Fail response detail at bottom <br/><br/>

- ### Delete Note
  endpoint: `DELETE /notes/:id`

  #### _Request_
  * headers
  ```js
  {
    "access_token": string,
  }
  ```
  * params
  ```js
  {
    "id": string,
  }
  ```
  #### _Response_
  * 200 OK
  ```js
  {
    "message": string,
  }
  ```  
  #### Fail Response :
    * 400 Bad Request   
    * 401 Unauthorized   
    * 500 Internal Server Error   

  Fail response detail at bottom <br/><br/>


  ### --- All Fail Response ---  
  * 400 Bad Request

      ```js
      {
        "message": string,
        "errors": Array
      }
      ```
  * 401 Unauth­orized

      ```js
      {
        "message": string,
        "errors": Array
      }
      ```
  * 404 Not Found
    ```js
    {
      "message": string,
      "errors": Array
    }
    ```

  * 500 Internal Server Error
    ```js
    {
      "message": string,
      "errors": Array
    }
    ```