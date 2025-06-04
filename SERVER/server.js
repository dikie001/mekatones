const express = require("express");
const app = express();

app.set("view engine", "ejs")
app.get("/", (req, res) => {
  console.log('server running at port:3000')
  res.render('index', {texts: 'Omondi', age:'23'})
});
app.listen(3000);
