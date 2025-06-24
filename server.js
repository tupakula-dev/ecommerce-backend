const express = require('express');
const dotenv = require('dotenv');
 const connectDB = require('./database');
 //const bcrypt=require("bcrypt");
 const cors = require('cors');
const cookieParser = require('cookie-parser');
const User=require("./models/User");

//const {validateSignupdate}=require("./utils/validation");

dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();
app.use(express.json()); 
// // Middleware
// app.use(cors({
//   origin: "http://localhost:3000", // frontend URL
//   credentials: true,
// }));
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(cookieParser());

// Parse JSON request body
const authrouter=require("./routes/auth");
const productrouter=require('./routes/product');
const orderrouter = require("./routes/order");
app.use("/",authrouter);
app.use("/",productrouter);
app.use("/", orderrouter);



// Sample route
app.get("/", (req, res) => {
  res.send("server is running")
  
});


// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
