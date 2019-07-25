const path=require("path");
const express=require("express");
const socketIO=require("socket.io");
const http=require("http");
const {generateMessage,generateLocationMessage}=require("./util/message");

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
    socket.emit("newMessage",generateMessage("admin","Welcome to the chat app"));
    socket.broadcast.emit("newMessage",generateMessage("admin","new user joined"));

    socket.on("createMessage",(message,callback)=>{
        console.log("created message",message);
        io.emit("newMessage",generateMessage(message.from,message.text));
        callback("this is from the server");
        // socket.broadcast.emit("newMessage",{
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // });
    });

    socket.on('createLocationMessage',coord=>{
        io.emit('newLocationMessage',generateLocationMessage("admin",coord.latitude,coord.longitude));
    });
});
server.listen(port,function(){
    console.log(`server is up on port ${port}`);
});