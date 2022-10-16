## Technologies used:

- Typecript
- React/Node/Express/Mongoose/Validator js
- MongoDB
- Bcrypt
- Passport
- JSON Web Tokens

## Notes & Considerations

Building a social platform for developers that lets them network and host their resumes online. An easy way to get an online presence and meet other developer online.

<span style="color:green">The project is still well in progress. I am considering using next js as I can just statically generate most of the applications pages and have the added benefit of being performant and deploying to the edge.</span>

The screenshot below is a concept I am drawing inspiration from. The goal is to get the user profile to look modern, clean and minimal.

## Concept Screenshot

![Concept screenshots](https://drive.google.com/uc?export=view&id=1GrEH9O1Ao1i7aQM18Hsko0KrUnEqwmAK)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

## Clone the repository

Use `git clone git clone https://Charles_Kiarie@bitbucket.org/Charles_Kiarie/devconnector.git`

### `npm client-install`

In the project directory, you can run:

### `npm run client`

Runs the front end in development mode
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run server`

Runs the rest api in development mode
Open [http://localhost:5000/api](http://localhost:5000/api) to view it in the browser.

### `npm dev`

Will run the client and server concurrntly in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Open [http://localhost:5000/api](http://localhost:5000/api) to view send requests to the api browser in postman

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

Learn more about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `REST API ENDPOINTS

This script will run json-server with mock data from mock db.json file found in the root folder.
Open [http://localhost:5000/api](http://localhost:5000/api) to view it in the browser.

It exposes the following endpoints:

## AUTHENTICATION ENDPOINTS

> @route <span style="color:orange">POST</span> api/users/register</br>
> @desc Register a user</br>
> @access Public</br>
> [http://localhost:5000/api/users/register](http://localhost:5000/api/users/register)

> @route <span style="color:orange">POST</span> api/users/login</br>
> @desc Login a users. Returning JWT Token.</br>
> @access Public</br>
> [http://localhost:5000/api/users/login](http://localhost:5000/api/users/login)

> @route <span style="color:green">GET</span> api/users/current</br>
> @desc Returns current user</br>
> @access Private</br>
> [http://localhost:5000/api/users/current](http://localhost:5000/api/users/current)

## POST ENDPOINTS `PRIVATE ROUTES NEED A VALID BEARER TOKEN(JWT RETURNED FROM api/users/login)`

> @route <span style="color:green">GET</span> api/posts</br>
> @desc Get all posts</br>
> @access Public</br>
> [http://localhost:5000/api/posts](http://localhost:5000/api/posts)

> @route <span style="color:green">GET</span> api/posts/:id</br>
> @desc Get post by id</br>
> @access Public</br>
> [http://localhost:5000/api/posts/:id](http://localhost:5000/api/posts/:id)

> @route <span style="color:orange">POST</span> api/posts</br>
> @desc Create post</br>
> @access Private</br>
> [http://localhost:5000/api/posts](http://localhost:5000/api/posts)

> @route <span style="color:red">DELETE</span> api/posts/:id</br>
> @desc Delete a post</br>
> @access Private</br>
> [http://localhost:5000/api/posts/:id](http://localhost:5000/api/posts/:id)

> @route <span style="color:orange">POST</span> api/posts/like/:id</br>
> @desc Like a post</br>
> @access Private</br>
> [http://localhost:5000/api/posts/like/:id](http://localhost:5000/api/posts/like/:id)

> @route <span style="color:red">DELETE</span> api/posts/unlike/:id</br>
> @desc Un-like a post
> @access Private
> [http://localhost:5000/api/posts/unlike/:id](http://localhost:5000/api/posts/unlike/:id)

> @route <span style="color:orange">POST</span> api/posts/comment/:id
> @desc Add comment to post</br>
> @access Private</br> > [http://localhost:5000/api/posts/comment/:id](http://localhost:5000/api/posts/comment/:id)

> @route <span style="color:red">DELETE</span> api/posts/comment/:id/:comment_id</br>
> @desc Remove comment from post</br>
> @access Private</br> > [http://localhost:5000/api/posts/comment/:id/:comment_id](http://localhost:5000/api/posts/comment/:id/:comment_id)

## PROFILE ENDPOINTS `PRIVATE ROUTES NEED A VALID BEARER TOKEN(JWT RETURNED FROM api/users/login)`

> @route <span style="color:green">GET</span> api/profile</br>
> @desc Get current user profile</br>
> @access Private</br> > [http://localhost:5000/api/profile](http://localhost:5000/api/profile)

> @route <span style="color:green">GET</span> api/profile/all</br>
> @desc Get all profiles</br>
> @access Public</br>
> [http://localhost:5000/api/profile/all](http://localhost:5000/api/profile/all)

> @route <span style="color:green">GET</span> api/profile/handle/:handle</br>
> @desc Get profile by handle</br>
> @access Public</br>
> [http://localhost:5000/api/profile/handle/:handle](http://localhost:5000/api/profile/handle/:handle)

> @route <span style="color:green">GET</span> api/profile/user/:user_id</br>
> @desc Get profile by user ID</br>
> @access Public</br>
> [http://localhost:5000/api/profile/user/:user_id](http://localhost:5000/api/profile/user/:user_id)

> @route <span style="color:orange">POST</span> api/profile</br>
> @desc Create user profile</br>
> @access Private</br>
> [http://localhost:5000/api/profile](http://localhost:5000/api/profile)

> @route <span style="color:red">DELETE</span> api/profile</br>
> @desc Delete user and profile</br>
> @access Private</br>
> [http://localhost:5000/api/profile](http://localhost:5000/api/profile)
