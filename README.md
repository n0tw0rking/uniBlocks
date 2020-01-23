# uniBlock   architecture 🛡️

Public Local managment that helps you to orgnize your home and neighbour with other residence for better live quality 


The API by itself doesn't do anything fancy, it's just a user CRUD with authentication capabilities.
Maybe we can transform this into something useful, a more advanced example, just open an issue and let's discuss the future of the repo.

## Development

We use `node` version `10.0`

```
nvm install 10.0
```

```
nvm use 10.0
```

The first time, you will need to run

```
npm install
```

Then just start the server with 

```
npm run start
```
It uses nodemon for livereloading :peace-fingers:

# API Validation
 
 By using celebrate the req.body schema becomes clary defined at route level, so even frontend devs can read what an API endpoint expects without need to writting a documentation that can get outdated quickly.

 ```js
 route.post('/signup', 
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  controller.signup)
 ```

 **Example error**

 ```json
 {
  "errors": {
    "message": "child \"email\" fails because [\"email\" is required]"
  }
 } 
 ```

[Link for github account here](https://github.com/n0tw0rking) 

# Roadmap
- [ ] API Validation layer 
- [ ] Unit tests examples
- [ ] The logging _'layer'_ 
- [ ] Add ageda dashboard
- [ ] Continuous integration with CircleCI 
- [ ] Deploys script and docs with Heroku
- [ ] Integration test with Insomnia  
- [ ] Instructions on typescript debugging with VSCode


# FAQ 

 ## The FrontEnd code
   Angular and it's inside the the puplic folder and it's have sepereate architech and it's ouwn package.json file and read me file  

  