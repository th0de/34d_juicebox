const app = import("./app");
require("dotenv").config();

const PORT = process.env.PORT || 5173;

app.get('/', function (req,res){
  res.send("'ello ova der!")
});

app.listen(5173, () => {
  console.log(`Listening on port ${PORT}...`);
});