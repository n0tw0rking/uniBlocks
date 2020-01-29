const User = require('../db/models/user');
const Block = require('../db/models/block');
const Message = require('../db/models/message');
const Balance = require('../db/models/balance');
const Subscription = require('../db/models/subscription');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
  subscription: async args => {
    //   const user = User.findOne({email:args.email})
    try {
      const subscription = await Subscription.findOne({ name: args.name })
        .populate('balance')
        .populate('user');
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
      const user = await User.findById({ _id: '5e2f11a306383525e580d2bc' }).populate('userMesg');
      //   console.log(user);
      return user;
    } catch (err) {
      console.log(err);
    }
  },
  // login ////////
  login: async args => {
    const user = await User.findOne({ email: args.userInput.email });
    if (!user) {
      throw new Error(' user does not exist ');
    }
    const isEqual = await bcrypt.compare(args.userInput.password, user.password);
    if (!isEqual) {
      throw new Error(' password is incorrect  ');
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, 'superpasswordkey', { expiresIn: '1h' });
    return { userId: user._id, token: token, tokenExpriration: 1 };
  },
  // create user /////
  createUser: (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }
    return User.findOne({ email: args.userInput.email })
      .then(user => {
        if (user) {
          throw new Error('user exists already');
        }
        return bcrypt.hash(args.userInput.password, 10);
      })
      .then(hashedPassword => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword,
        });
        console.log(user);
        return user.save();
      })
      .then(user => {
        return { ...user._doc, password: null };
      })
      .catch(err => {
        throw err;
      });
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
      sender: '5e2f11a306383525e580d2bc',
    });
    try {
      /////
      const user = await User.findById({ _id: '5e2f11a306383525e580d2bc' });
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
  addSub: async args => {
    const user = await User.findOne({ email: args.email });
    user.userSubscription.push();
    console.log(user);
    return user;
  },
  createSub: async args => {
    const balance = new Balance({
      value: 0,
    });

    const subscription = new Subscription({
      name: args.name,
      balance: balance._id,
    });
    try {
      //find user info by using the email provided in the args the save his _id to the subscripton
      //tbale
      await balance.save();
      const user = await User.findOne({ email: args.email });
      subscription.user = user._id;
    } catch (err) {
      console.log(err);
    }
    try {
      return await subscription.save();
    } catch (err) {
      throw new Error('not allowed ,duplicate name');
    }
  },
};
