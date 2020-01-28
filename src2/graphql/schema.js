const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    

    input UserInput {
      email : String!
      password : String!
    }
    input BlockInput{
        name : String!
        location:String 
    }
    input MessageInput {
        message : String!
        
        
    }
    type User {
    _id : ID!
    email : String!
    password : String 
    userMesg : [Message!]!

    }
    
    type Block {
        _id:ID!
        name : String!
        location :String 
    }
    type Message{
        _id:ID!
        message:String!
        sender : User!
    }
    type AuthData{
        userId : ID !
        token : String!
        tokenExpriration : Int!
    }
    type Balance {
        _id : ID!
        value : Float!
    }
    
    type RootQuery {
        oneUser:User!
        login(userInput :UserInput) :  AuthData!
        message: [Message!]!
    }
    type MutationQuery{
        createUser(userInput :UserInput ): User!
        createBlock(blockInput : BlockInput) : Block! 
        createMessage(messageInput : MessageInput):Message!
        addBalance(value : Float!): Balance!
        }
    schema {
        query : RootQuery,
        mutation : MutationQuery
    }`);
