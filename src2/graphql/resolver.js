const User = require('../db/models/user');
const Block = require('../db/models/block');
const Message = require('../db/models/message');
const Balance = require('../db/models/balance');
const Subscription = require('../db/models/subscription');
const Service = require('../db/models/service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
module.exports = {
  /*
		find one oneSubscription and list his balance / user / block
		by one query in grapgql
		example for that 
		query{subscription(name:"AAA"){ _id block{ _id name location}}}
	*/

  oneSubscription: async args => {
    //   const user = User.findOne({email:args.email})
    try {
      const subscription = await Subscription.findOne({ name: args.name })
        .populate('balance')
        .populate('user')
        .populate('block')
        .populate('service');
      // .populate({
      //   path: 'user',
      //   populate: {
      //     path: 'userMesg',
      //     populate: {
      //       path: 'sender', // i used this just practice to how deep i can populate
      //     },
      //   },
      // });
      console.log(subscription);
      return subscription;
    } catch (err) {
      console.log(err);
    }
  },
  //this function to retrive one user information by his Id
  //when he is loged on
  oneUser: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated');
    // }

    try {
      //need change the _id by the req.userId
      const user = await User.findById({ _id: '5e32954c2caab0519d885385' })
        .populate('userMesg')
        .populate({
          path: 'userSubscription',
          populate: {
            path: 'block',
          },
        });
      console.log(user);
      return user;
    } catch (err) {
      console.log(err);
    }
  },
  oneBlock: async args => {
    try {
      const block = await Block.findOne({ name: args.name }).populate('userSubscription');
      console.log(block);
      return block;
    } catch (err) {
      console.log(err);
    }
  },
  oneService: async args => {
    const service = await Service.findOne({ name: args.name }).populate('subscriptionId');
    return service;
  },
  // login ////////
  login: async args => {
    const user = await User.findOne({ email: args.userInput.email });
    if (!user) {
      // throw new GraphQLError(' user does not exist ');
      throw new Error(' user does not exist ');
    }
    const isEqual = await bcrypt.compare(args.userInput.password, user.password);
    if (!isEqual) {
      throw new Error(' password is incorrect  ');
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin, isSuperAdmin: user.isSuperAdmin },
      'superpasswordkey',
      { expiresIn: '5h' },
    );
    return {
      userId: user._id,
      token: token,
      tokenExpriration: 5,
      // isAdmin: user.isAdmin, isSuperAdmin: user.isSuperAdmin, need to be deleted in deployment
      //for security
      isAdmin: user.isAdmin,
      isSuperAdmin: user.isSuperAdmin,
    };
  },
  // create user /////
  createUser: (args, req) => {
    console.log(req.isAuth);
    console.log(req.isSuperAdmin, '@@@@@');
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    } else if (!req.isAdmin && !req.isSuperAdmin) {
      throw new Error('not allowed to create user with user privilege');
    }

    return User.findOne({ email: args.userInput.email })
      .then(user => {
        if (user) {
          throw new Error('user exists already');
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then(hashedPassword => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword,
        });
        if (req.isSuperAdmin) {
          user.isAdmin = args.userInput.isAdmin;
        }
        // console.log(user);
        return user.save();
      })
      .then(user => {
        return { ...user._doc, password: null };
      })
      .catch(err => {
        throw err;
      });
  },
  // list all the service in the database
  service: async () => {
    const service = await Service.find();
    return service;
  },
  message: async () => {
    try {
      const messages = await Message.find().populate('sender');
      /////////
      messages.forEach(ele => {
        ele.sender.password = 'null';
      });
      ////////
      return messages.map(message => {
        return message;
        // return { ...message._doc, sender: { ...message._doc.sender._doc, password: 'null' } };
        // this is another approch that u can do or you can use mehtod forEach
      });
    } catch (err) {
      console.log(err);
    }
  },
  // create block /////
  createBlock: async args => {
    const blockName = await Block.findOne({ name: args.blockInput.name });
    if (blockName) {
      throw new Error('The block name already exsist ');
    }
    const block = new Block({
      name: args.blockInput.name,
      location: args.blockInput.location,
    });
    try {
      saveBlock = await block.save();
      return saveBlock;
      //   return { ...saveBlock._doc };
    } catch (err) {
      console.log(err);
    }
  },
  // create meassge ////
  createMessage: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated');
    // }
    //req.userId

    const message = new Message({
      message: args.messageInput.message,
      sender: '5e315ae504442446af8ed9cc',
    });
    try {
      /////
      const user = await User.findById({ _id: '5e315ae504442446af8ed9cc' });
      user.userMesg.push(message._id);
      await user.save();
      ////////
      return await message.save();
    } catch (err) {
      console.log(err);
    }
  },
  addBalance: async args => {
    const balance = new Balance({
      value: args.value,
    });
    try {
      return await balance.save();
    } catch (err) {
      console.log(err);
    }
  },
  //this func add user to Subscription ***** need to work on it more
  addSub: async args => {
    const user = await User.findOne({ email: args.email });
    user.userSubscription.push();
    console.log(user);
    return user;
  },
  // this func create subscription by providing the block name and email of the user
  createSub: async args => {
    const balance = new Balance({
      value: 0,
    });
    const subscription = new Subscription({
      name: args.subInput.name,
      balance: balance._id,
    });
    try {
      // serach for the block name to be added to the subscription of the user
      const block = await Block.findOne({ name: args.subInput.block });
      subscription.block = block._id;
      block.userSubscription.push(subscription._id);
      await block.save();
    } catch (err) {
      console.log(err);
    }

    try {
      //find user info by using the email provided in the args the save his _id to the subscripton
      //tbale
      await balance.save();
      const user = await User.findOne({ email: args.subInput.email });
      console.log(user);
      subscription.user = user._id;

      user.userSubscription.push(subscription._id);
      await user.save();
    } catch (err) {
      console.log(err);
    }
    try {
      return await subscription.save();
    } catch (err) {
      throw new Error('not allowed ,duplicate name');
    }
  },
  createService: async args => {
    const service = new Service({
      name: args.name,
    });
    try {
      return await service.save();
    } catch (err) {
      console.log(err);
    }
  },
  //add service to subscription
  addSerToSub: async args => {
    const service = await Service.findOne({ name: args.serviceName });
    const subscription = await Subscription.findOne({ name: args.subName });
    service.subscriptionId.push(subscription._id);
    subscription.service.push(service._id);
    try {
      await subscription.save();

      try {
        return await service.save();
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  },
  // add admin to block by his email and the block name

  addAdminToBlock: async args => {
    try {
      const block = await Block.findOne({ name: args.blockName });
      if (!block) {
        throw new Error('The Block name is not an exist  user');
      }
      try {
        const user = await User.findOne({ email: args.email });
        if (!user.isAdmin) {
          throw new Error('The Email Provided is not an Admin user');
        }
        block.blockAdmin = user._id;
        user.adminBlock = block._id;
        try {
          await user.save();
          try {
            return await block.save();
          } catch (err) {
            console.log(err);
          }
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
