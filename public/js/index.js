var socket=io();
socket.on("connect",()=>{
    console.log("connected to the server");
    socket.emit("createMessage",{
        from:"neha",
        text:"good night"
    });
});
socket.on("disconnect",()=>{
    console.log("disconnected from the server");
});

socket.on("newMessage",function(message){
    console.log("got message",message);
});