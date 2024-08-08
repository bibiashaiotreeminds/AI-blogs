const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors= require('cors');


const app = express();
app.use(express.static('./src/images/'));
const PORT = process.env.PORT || 5000;

const {errorHandler}=require('./middleware/errorMiddleware')
app.use(cors(), express.json())
// app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(errorHandler)
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/blogs', require('./routes/blogRoutes'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


