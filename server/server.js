const path=require("path");
const express=require("express");
const socketIO=require("socket.io");
const http=require("http");

const app=express();
const server=http.createServer(app);
const io=socketIO(server);
const publicPath=path.join(__dirname,"../public");
const port=process.env.PORT||3000;
app.use(express.static(publicPath));

// app.get("/",(req,res)=>{
//     res.sendFile("index.html");
// });

io.on("connection",socket=>{
    console.log("New User Connected");
    socket.on("disconnect",function(){
        console.log("client disconnected");
    });
    socket.emit("greetings",{
        from:"admin",
        text:"Welcome to the chat app",
        createdAt:new Date().getTime()
    });
    socket.broadcast.emit("newUser",{
        from:"admin",
        text:"new user joined",
        createdAt:new Date().getTime()
    });
    socket.on("createMessage",message=>{
        console.log("created message",message);
        io.emit("newMessage",{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        });
        // socket.broadcast.emit("newMessage",{
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // });
    });
});
server.listen(port,function(){
    console.log(`server is up on port ${port}`);
});