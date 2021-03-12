// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
//require('dotenv').config();
const passport = require("./config/passport");
const exphbs = require("express-handlebars");
//const config=require("./config/config");
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 3000;
const db = require("./models");
const path=require('path');
// Creating express app and configuring middleware needed for authentication
const app = express();
app.engine("hbs", exphbs({ defaultLayout: "main" }));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
