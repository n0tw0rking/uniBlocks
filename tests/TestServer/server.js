'use strict';
const axios = require('axios');
var http = require('http');
var https = require('https');
var port = process.env.PORT || 1337;

const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

//List of queries to test - add your new query here
const myTestQueries = [
    `mutation{createUser(input:{email:"contact@ammar.ly",isUser:true,password:"123456",userId:0,isAdmin:false})}`,
    `mutation{createService(input:{aServiceId:0,serviceName:"Fixing Water"}) }`,
    `mutation{createSubscription(input:{subscriptionId:0})}`,
    `mutation{updateSubscription(input:{servId:1,subId:1})}`,
    `mutation{createTransaction(input:{amount:50,transactionType:"deposit",serviceId:1,subscriptionId:1})}`,
    `mutation{createBlock(input:{blockName:"first block",location:"planet earth"})}`,
    `mutation{createMessage(input:{content:"always and forever ",senderId:1,toList:[2,3]})}`,
    `query{messages{userMessages{message{content}}}}`

]

async function caller(array) {
    for (let i = 0; i < array.length; i++) {
        try {
            var data = await axios({
                //GraphQL server url - change with your url
                url: 'https://localhost:44376/graphql',
                httpsAgent,
                method: 'post',
                data: {
                    query: array[i]
                }
            })
            console.log(array[i].split("(", 12)[0] + '\n' + "SUCCESS")
        } catch (err) {
            console.log(array[i].split("(", 1)[0] + '\n' + "ERROR")
        }
    }
    server.close();
}
caller(myTestQueries)

