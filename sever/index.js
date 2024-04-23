const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.get('/', function (req,res){
  res.send("'ello ova der!")
});

app.listen(8080, () => {
  console.log(`Listening on port ${PORT}...`);
});