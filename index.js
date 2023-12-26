const express = require('express');
const bodyParser = require('body-parser');
const characterSearchRouter = require("./src/routes/characterSearch");
// const userRouter = require("./routes/user");

const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.json());



app.use("/characterSearch", characterSearchRouter)
// app.use("/user", userRouter)


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});