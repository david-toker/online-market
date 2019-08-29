const express = require('express');
const app = express();
const path = require('path');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const session = require("express-session");
const passport = require('passport');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/market';
const PORT = process.env.PORT || 3007
require('./config/passport')(passport);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended:false}));


app.use(fileUpload());




app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);



app.use(passport.initialize());
app.use(passport.session());

// =====from folder client=========
// app.use(express.static('../client/dist/client'));

// =====from folder server=========
app.use(express.static('./dist/client'));

const loginController = require('./controllers/login.controller');
const registerController = require('./controllers/register.controller');
const dashboardController = require('./controllers/dashboard.controller');
const storehouseController = require('./controllers/storehouse.controller');
const ordersController = require('./controllers/orders.controller');
const usersController = require('./controllers/users.controller');
const adminController = require('./controllers/admin.controller');

app.use('/login', loginController);
app.use('/register', registerController);
app.use('/dashboard', dashboardController);
app.use('/storehouse', storehouseController);
app.use('/orders', ordersController);
app.use('/users', usersController);
app.use('/admin', adminController);





app.use(express.static('public'));


// =====from folder client=========
// app.use('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/dist/client', 'index.html'))
// });

// =====from folder server=========
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/client', 'index.html'))
});



mongoose.connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, err => {
    app.listen(PORT, err => {
        console.log(`Server Up! PORT ${PORT}`)
    })
})

