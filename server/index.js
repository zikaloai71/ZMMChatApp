const app = require("express")()
const http = require("http").createServer(app)
const PORT = process.env.port | 3000
const { Server } = require("socket.io");
const io = new Server(http);

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/views/index.html");
});

io.on("connection", (socket)=>{
    console.log("user Connected ..!")
})

http.listen(PORT, ()=>{console.log("Connected on port " + PORT)})