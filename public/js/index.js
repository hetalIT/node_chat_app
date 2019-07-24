var socket=io();
socket.on("connect",()=>{
    console.log("connected to the server");
});
socket.on("disconnect",()=>{
    console.log("disconnected from the server");
});

socket.on("newMessage",function(message){
    // console.log("got message",message);
    jQuery("#messages").prepend(`<li>${message.from}:${message.text}</li>`);
});

// socket.on("greetings",function(greet){
//     console.log("Admin:",greet);
// });

// socket.on("newUser",function(data){
//     console.log("Admin says",data);
// });

// socket.emit("createMessage",{
//     from:"neha",
//     text:"good night"
// },function(data){
//     console.log("got it",data);
// });

jQuery('#message-form').on("submit",(e)=>{
    e.preventDefault();
    socket.emit("createMessage",{
        from:"User",
        text:jQuery('[name=message]').val()
    },function(){
        console.log("Got it");
    });
});