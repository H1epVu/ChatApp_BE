const express = require('express')
const bodyParser = require('body-parser')

const sequelize = require('./db');
const User = require('./models/user');
const Conversation = require('./models/conversation');
const Message = require('./models/message');
const Participant = require('./models/participant');

require('dotenv').config()

const userRouters = require('./routers/user')
const convRouters = require('./routers/conversation')
const messRouters = require('./routers/message')

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


User.hasMany(Message, { foreignKey: 'sender_id' });
Message.belongsTo(User, { foreignKey: 'sender_id' });

Conversation.hasMany(Message, { foreignKey: 'conversation_id' });
Message.belongsTo(Conversation, { foreignKey: 'conversation_id' });

Conversation.hasMany(Participant, { foreignKey: 'conversation_id' });
Participant.belongsTo(Conversation, { foreignKey: 'conversation_id' });

User.hasMany(Participant, { foreignKey: 'user_id' });
Participant.belongsTo(User, { foreignKey: 'user_id' });

sequelize.sync().then(result => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
}).catch(err => {
  console.log(err)
})