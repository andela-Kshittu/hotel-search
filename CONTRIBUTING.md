# StormX Test Application

## Setup and configuration

#### 1. Requirements

    1. MongoDB : ensure you have mongoDb install on you system and it's up and running

#### 2. Add env variables 

    1. Create a .env file in the project directory.

    2. Copy keys from env-sample to .evn and set the values appropiately 

#### 3. Start the server

    1. From the project root dir run : npm install && npm start (server should start on port 3000 )

#### 4. Running Test

    From the root directory run : npm test

#### 5. Deploy to heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://gitlab.com/stormx-inc/code-test/candidates/kenny-s/backend-services/tree/kshittu-stormx-assessment)

#### Live version on heroku 

    1. swagger doc : https://stormx.herokuapp.com/api-docs/
    2. base url : https://stormx.herokuapp.com

    3. Documented endpoints in swagger :

        POST /users/ : Create a new user
        POST /users/login : Login to get jwt token for subsequent requests

    3. Undocumented endpoints :

        GET /users/me/requests :  Number of open requests for active user
        GET /users/:id/requests : Number of open requets for specified user

        GET /admin/transactions/ : Transaction that require admin approval
        GET /admin/transactions/:id/approve : Give admin approval to a transaction
        GET /admin/transactions/:id/reject : Reject admin approval request

        POST /transactions/ : Create a transaction
        GET /transactions/ : Get a all transactions
        GET /transactions/:id : Get a specific transaction
        PUT /transactions/:id : Update a transaction [expired transactions can not be updated]
        GET /transactions/:id/approve : approve a transaction 
        GET /transactions/:id/reject: reject a transaction 
        DELETE /transactions/:id : delete a transaction 

#### Assumptions :

    1. Any storm user can create a transaction 
    2. Transaction request can only be sent to one user and a transaction can require minimum of one approval and maximum of two. i.e If user A sends a transaction request to user B, then only user B’s approval is needed. if the transaction requires admin approval, then an admin has to approve the transaction too (this makes it two approval requests) 
    3. Transaction is in `new` state when created, moves to pending when one of the requests has been approved, moves to denied if one of the approval requests is denied and moves to completed if all of the approval request have been accepted.
    4. For testing purpose the create user route would allow a client to create an admin user