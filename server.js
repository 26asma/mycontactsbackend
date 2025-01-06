const express =require("express");
const cors = require("cors");
const errorhandler = require("./middleware/errorhandler");
const validateTokenHandler = require("./middleware/validateTokenHandler");
const connectdb = require("./config/dbconnection");
const dotenv =require("dotenv").config();
connectdb();
const app=express();
const port = process.env.PORT|| 5000;
app.use(express.json())
app.use(cors({
   origin: "*",  // Allows all origins temporarily for debugging
 }));
app.use("/api/contacts",require("./routes/contactroutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorhandler)
app.use(validateTokenHandler)
app.listen(port,() => {
   console.log(`server is running in ${port}`)   
}) 
  