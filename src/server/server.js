const express = require("express");
const app = express();
const config = require('../../config')
app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.get("/", (req, res) => {
    res.render("index")
});
app.get("/src", (req, res) => {
    res.render("src");
});
app.get("/cmd", (req, res) => {
    res.render("cmd");
});
app.use(express.static(`${__dirname}/assets`));
app.locals.basedir = `${__dirname}/assets`;
app.use("/ping", (req, res) => {
    res.send(new Date());
});
app.listen(process.env.PORT || 3000);

const request = require("node-superfetch");
const { Http2ServerRequest } = require("http2");
setInterval(async() => {
    await request.get(config.express_url);
    await request.get(config.express_url);
}, 5 * 60 * 1000);
