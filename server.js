require("dotenv").config();
const express = require("express");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const authController = require("./controller/auth-controller");
const userController = require("./controller/user-controller");
const historyController = require("./controller/history-controller");
const likesController = require("./controller/likes-controller");
const searchController = require("./controller/search-controller");
const tmdb = require("./controller/tmdb-controller");


const db = require("./models");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      contains1: function(index){
        let pages = [0,1,2,3];
        let value = false;
        for (let i = 0; i < pages.length; i++){
          // console.log(`array index: ${pages[i]} -- handlebars indes: ${index}`);
          if (pages[i]===index){
             
              value = true;
          }
        }
        return value;
      },
      contains2: function(index){
        let pages = [4,5,6,7];
        let value = false;
        for (let i = 0; i < pages.length; i++){
          // console.log(`array index: ${pages[i]} -- handlebars indes: ${index}`);
          if (pages[i]===index){
             
              value = true;
          }
        }
        return value;
      },

    }
  })
);
app.set("view engine", "handlebars");

app.use(likesController);
app.use(userController);
app.use(historyController);
app.use(searchController);
app.use(authController);
app.use(tmdb);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
const startServer = async () => {
  await db.sequelize.sync(syncOptions);

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
  });
};

startServer();
