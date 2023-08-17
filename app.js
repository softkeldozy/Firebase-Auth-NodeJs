const express = require('express');
const app = express();
const dotenv = require('dotenv');

//seting up firebase
const admin = require("firebase-admin");
const credentials = require("./serviceAccountKey.json");//include in .gitignore file before pushing to repository

dotenv.config(); // Load environment variables from .env file

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

// Should come before the post
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Creating Endpoints
app.post('/signup', async (req, res) => {
  const userResponse = await admin.auth().createUser({
    email:req.body.email,
    password:req.body.password,
    emailVerified:false,
    disabled:false
  });
  res.json(userResponse); 
});

// Setting PORT and listening for changes
const PORT=process.env.PORT||5900;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
})