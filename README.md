# UniBlocks 

Public Local management service that helps you to organize your home with other property owners in your neighborhood for better life quality.
It also connects you with your daily life needs regarding your living place and the services you need in your neighborhood.
also being aware of anything that happens in your building block.

shares work between you and the neighbors at any event that comes up.

# Motivation

- Engaged communities
- Community Organisating
- Share with your neighbours
- Services and emergency planning


# Tech/framework used

 Built with :
- Express, Node js 
- MongoDB, Cloude Mlab
- Angular 8
- typeScript
- CircleCi
- Jasmin Karma Angular / Jest Node
- Mobile Development Progressive Web Apps
- GrapQl




## Development

`node` version `12.0`


The first time, you will need to run

```
npm install
```

Then just start the server with 

```
npm start
```
It uses nodemon for livereloading :peace-fingers:

# API Validation
 
 By using try catch and async methode to handel internal routing level, so even frontend devs can read what an API endpoint expects without need to writting a documentation that can get outdated quickly.
 and this is example of adding a new admin request at the routing .

 ```js
 router.post('/', async (req, res) => {
    try{
        const admin = new Admin(req.body);
        await admin.save();
        const token = await admin.generateAuthToken();
        res.status(201).json({admin, token});
    }catch(err){
        res.status(400).send(err);
    }
});
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
## Status
Project is in planning phase.

# Roadmap
- [ ] API Validation layer 
- [ ] Unit tests examples
- [ ] The logging 
- [ ] Add agenda dashboard
- [ ] Continuous integration with CircleCI 
- [ ] Deploys script and docs with Heroku
- [ ] Integration test with Insomnia  
- [ ] Instructions on typescript debugging with VSCode


# FAQ 

 ## The FrontEnd code
   Angular is inside the public folder, it has a separate architect, its own package.json file and read me file  
   
## Contact
created by @OmarBara, @mohamed-fared, @AdamMomen and @psktcsharp

## Contributors

Thanks goes to these wonderful people

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/OmarBara"><img src="https://avatars0.githubusercontent.com/u/26072723?s=400&v=4" width="100px;" alt="Omar Bara"/><br /><sub><b>Omar Bara</b></sub></a><br /><a href="" title="Code">💻</a> <a href="" title="Documentation">📖</a> <a href="" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/mohamed-fared"><img src="https://avatars0.githubusercontent.com/u/25877831?v=4" width="100px;" alt="fared"/><br /><sub><b>mohamed</b></sub></a><br /><a href="https://github.com/mohamed-fared" title="Code">💻</a> <a href="" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/AdamMomen"><img src="https://avatars1.githubusercontent.com/u/55929982?s=400&v=4" width="100px;" alt="Adam Momen"/><br /><sub><b>Adam Momen</b></sub></a><br /><a href="https://github.com/AdamMomen" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/psktcsharp"><img src="https://avatars0.githubusercontent.com/u/23266034?s=400&v=4" width="100px;" alt="Amar"/><br /><sub><b>Amar</b></sub></a><br /><a href="https://github.com/psktcsharp" title="Bug reports">🐛</a> <a href="" title="Code">💻</a></td>   
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

[MIT](./LICENSE)

