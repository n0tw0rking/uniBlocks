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

    type Subscription {
        _id : ID!
        name : String!
        balance : Balance!
        user : User !

    }
    
    type RootQuery {
        oneUser:User!
        login(userInput :UserInput) :  AuthData!
        message: [Message!]!
        subscription(name:String!) : Subscription! 
    }
    type MutationQuery{
        createUser(userInput :UserInput ): User!
        createBlock(blockInput : BlockInput) : Block! 
        createMessage(messageInput : MessageInput):Message!
        addBalance(value : Float!): Balance!
        createSub(name :String!,email:String!) : Subscription!
        addSub (email:String!):User!
        }
    schema {
        query : RootQuery,
        mutation : MutationQuery
    }`);
