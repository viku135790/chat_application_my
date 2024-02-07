import express from 'express';

// The bodyParser middleware is used for parsing incoming JSON and URL-encoded data in the request body.
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// The cors middleware is used to handle Cross-Origin Resource Sharing, allowing your server to respond to requests from different origins (domains).
import cors from 'cors';
import postRoute from "./routes/posts.js"
import userRoute from "./routes/users.js"

import swaggerUi from 'swagger-ui-express';
import specs from './swaggerConfig.js';
// dotenv to set up environment variables
import dotenv from 'dotenv'

const app = express();
dotenv.config();
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// This line is configuring the Express application (app) to use the bodyParser middleware specifically for handling JSON data in the request body. The bodyParser middleware parses incoming request bodies and makes the parsed data available in req.body of your route handlers.
// limit: "30mb": This sets the maximum size of the JSON payload that the server will accept to 30 megabytes. It helps prevent denial-of-service attacks by limiting the amount of data that can be sent in a single request.
// extended: true: This option allows for parsing of nested objects in the JSON data.
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// swagger API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/posts', postRoute);
app.use('/users', userRoute);


// connect to the mongodb cloud atlas
// const CONNECT_URL = 'mongodb+srv://root:TIGER@cluster0.obqmhqy.mongodb.net/'
const PORT = process.env.PORT || 5000

// useNewUrlParser: true: This option is used to parse the MongoDB connection string using the MongoDB Node.js driver's new URL parser. The URL parser in the MongoDB Node.js driver has been updated, and setting this option to true ensures that the new parser is used.
// useUnifiedTopology: true: This option enables the use of the new Server Discovery and Monitoring engine in the MongoDB Node.js driver. It is used to opt into the new connection management engine and server discovery and monitoring engine. The old engine is deprecated, and using this option with true is recommended for new applications.
// its not recommended to use this option but if you are using this then all the options and error are available in the console
mongoose.connect(process.env.CONNECT_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((err) => console.log(err));