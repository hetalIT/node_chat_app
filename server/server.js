const path=require("path");
const express=require("express");
const socketIO=require("socket.io");
const http=require("http");
const {generateMessage,generateLocationMessage}=require("./util/message");
const {isRealString}=require("./util/validation");
const {Users}=require("./util/users");

const app=express();
const server=http.createServer(app);
const io=socketIO(server);
const publicPath=path.join(__dirname,"../public");
const port=process.env.PORT||3000;
const users=new Users();
app.use(express.static(publicPath));

// app.get("/",(req,res)=>{
//     res.sendFile("index.html");
// });

io.on("connection",socket=>{
    console.log("New User Connected");
    socket.on("disconnect",function(){
        var user=users.removeUser(socket.id)[0];
        io.to(user.room).emit('updateUserList',users.getUserList(user.room));
        io.to(user.room).emit('newMessage',generateMessage("Admin",`${user.name} has left`));
    });
    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room))
        {
            return callback('Name and Room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        socket.emit("newMessage",generateMessage("Admin","Welcome to the chat app"));
        socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin",`${params.name} has joined`));
        callback();
    });

    socket.on("createMessage",(message,callback)=>{
        console.log("created message",message);
        var user=users.getUser(socket.id)[0];
        //console.log(user);
        if(user && isRealString(message.text))
             io.to(user.room).emit("newMessage",generateMessage(user.name,message.text));
        callback();
        // socket.broadcast.emit("newMessage",{
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // });
    });

    socket.on('createLocationMessage',coord=>{
        var user=users.getUser(socket.id)[0];
        if(user)
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coord.latitude,coord.longitude));
    });
});
server.listen(port,function(){
    console.log(`server is up on port ${port}`);
});