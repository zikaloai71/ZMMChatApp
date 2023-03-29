const app = require("express")()
const http = require("http").createServer(app)
const PORT = process.env.port | 3000
const { Server } = require("socket.io");
const io = new Server(http);

const login = require("./routes/Login")
const register = require("./routes/register")

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/views/index.html");
});
app.use("/login", login)
app.use("/register", register)

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

http.listen(PORT, ()=>{console.log("Connected on port " + PORT)})