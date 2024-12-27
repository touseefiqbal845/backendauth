const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/userRoutes');
const passport = require('passport');
const cors = require('cors');
require('./services/passport');

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

mongoose.connect('mongodb+srv://touseefiqbal845:Punjabuni321@auth20.vjqq3.mongodb.net/?retryWrites=true&w=majority&appName=auth20', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => console.log('connected'));
app.use('/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
