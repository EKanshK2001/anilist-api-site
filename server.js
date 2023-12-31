const express = require('express');
const bodyParser = require('body-parser');
const characterSearchRouter = require("./src/routes/characterSearchRoute");
// const userRouter = require("./routes/user");

const app = express();

//static files 
app.use(express.static(__dirname + '/public'));

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text()); 
app.use(bodyParser.json());



app.use("/characterSearch", characterSearchRouter)
// app.use("/user", userRouter)


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/characterSearch/`);
});