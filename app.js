import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
import bodyParser from 'body-parser';
import Auth from "./app/routes/auth.routes.js";
import User from "./app/routes/user.routes.js";

const app = express();
const { json, urlencoded } = pkg;

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - app/json
app.use(express.json());

// parse requests of content-type - app/json
app.use(bodyParser.json());

// parse requests of content-type - app/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
})

// routes

const user = User(app);
const auth = Auth(app);

// set port, listen for requests

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

