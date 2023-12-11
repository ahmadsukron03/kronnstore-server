const express = require("express");
const app = express();
const path = require('path')
const PORT = process.env.PORT || 8000;
const cors = require('cors');

app.use(cors({credentials: true, origin: true}));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/img', express.static(path.join(__dirname, './public/img')))

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Cannot connect to database!", err);
    process.exit()
  });
  

  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  app.get("/", (req, res) => {
    res.json({
      message: "Welcome to Kronnstore-server",
    });
  });


  require('./app/routes/product.route')(app)
  require('./app/routes/order.route')(app)

  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
  