const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const aylien = require("aylien_textapi");
const cors = require("cors");

const app = express();

app.use(cors());

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, "../dist")));

const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(4000, function() {
  console.log("Example app listening on port 4000!");
});

app.post("/nlp", function(req, res) {
  let result = "";
  req.on("data", function(chunk) {
    console.log("data is coming in");
    result += chunk;
  });
  req.on("end", function() {
    console.log("done with data");

    req.jsonBody = JSON.parse(result);

    let { type, text } = req.jsonBody;

    let data = {};

    // ensure text is in lowercase
    type = type.toLowerCase();

    // ensure type is either text or url
    if (type !== "url" && type !== "text") type = "text";

    // set data, text or url
    data[type.toLowerCase()] = text;

    // Call the TextApi!!!

    textapi.classify(data, (error, response) => {
      if (error) {
        console.log({ error });

        return res
          .status(503)
          .send({ error: error.message || "An Error Occured" });
      }
      console.log({ response });
      return res.status(200).send({ response });
    });
  });
});
