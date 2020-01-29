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
    input SubInput{
        name :String!
        email:String!
        block:String!
    }
    type User {
    _id : ID!
    email : String!
    password : String 
    userMesg : [Message!]!
    userSubscription :[Subscription!]!

    }
    
    type Block {
        _id:ID!
        name : String!
        location :String 
        userSubscription:[Subscription!]!
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
        block : Block!
    }
    type Service {
        _id : ID! 
        name : String!

    }
    type RootQuery {
        oneUser:User!
        login(userInput :UserInput) :  AuthData!
        message: [Message!]!
        subscription(name:String!) : Subscription! 
        service:[Service!]!
    }
    type MutationQuery{

        createUser(userInput :UserInput ): User!
        createBlock(blockInput : BlockInput) : Block! 
        createMessage(messageInput : MessageInput):Message!
        createService (name :String!):Service!
        createSub(subInput:SubInput) : Subscription!
        addSub(email:String!):User!
        addBalance(value : Float!): Balance!
        addSerToSub(name:String!):Service!


        }
    schema {
        query : RootQuery,
        mutation : MutationQuery
    }`);
