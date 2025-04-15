const express = require('express');
const loginRoutes = require('./routes/login');
const signinRoutes = require('./routes/signin');
const cors = require("cors");
const bodyParser = require('body-parser');
const db=require("./config/db");
const User=require("./models/User");




const app = express();
const port = 3004


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use('/login', loginRoutes);
app.use('/signin', signinRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});