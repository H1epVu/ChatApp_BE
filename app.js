const express = require('express')
const bodyParser = require('body-parser')

const sequelize = require('./db');
const User = require('./models/user');
const Conversation = require('./models/conversation');
const Message = require('./models/message');
const Participant = require('./models/participant');
const Friend = require('./models/friend');

require('dotenv').config()

const userRouters = require('./routers/user')
const convRouters = require('./routers/conversation')
const messRouters = require('./routers/message')
const friendRouters = require('./routers/friend')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ACCESS_CONTROL_ALLOW_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', process.env.ACCESS_CONTROL_ALLOW_METHODS);
  res.setHeader('Access-Control-Allow-Headers', process.env.ACCESS_CONTROL_ALLOW_HEADERS);
  next();
})


app.use('/user', userRouters)
app.use('/conv', convRouters)
app.use('/mess', messRouters)
app.use('/friend', friendRouters)


User.hasMany(Message, { foreignKey: 'sender_id' });
Message.belongsTo(User, { foreignKey: 'sender_id' });

Conversation.hasMany(Message, { foreignKey: 'conversation_id' });
Message.belongsTo(Conversation, { foreignKey: 'conversation_id' });

Conversation.hasMany(Participant, { foreignKey: 'conversation_id' });
Participant.belongsTo(Conversation, { foreignKey: 'conversation_id' });

User.hasMany(Participant, { foreignKey: 'user_id' });
Participant.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Friend, { foreignKey: 'user_id', as: 'sentRequests' });
User.hasMany(Friend, { foreignKey: 'friend_id', as: 'receivedRequests' });

Friend.belongsTo(User, { foreignKey: 'user_id', as: 'requester' });
Friend.belongsTo(User, { foreignKey: 'friend_id', as: 'receiver' });

sequelize.sync().then(result => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
}).catch(err => {
  console.log(err)
})