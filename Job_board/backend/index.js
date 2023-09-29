const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const routes1=require("./routes/UserRoute")
const routes2=require("./routes/EmployerRoute")
const routes3=require("./routes/JobRoute")
const routes4=require("./routes/ApplicationRoute")

const app=express();
const PORT =process.env.PORT | 5000

app.use(express.json())
app.use(cors())

mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongo DB connected"))
.catch((err)=>console.log(err));

app.use("/api",routes1);
app.use("/api",routes2);
app.use("/api",routes3);
app.use("/api",routes4);

app.listen(PORT,()=>console.log(`Listening at port ${PORT}`))

