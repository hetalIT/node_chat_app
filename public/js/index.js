var socket=io();
socket.on("connect",()=>{
    console.log("connected to the server");
});
socket.on("disconnect",()=>{
    console.log("disconnected from the server");
});

socket.on("newMessage",function(message){
    // console.log("got message",message);
    jQuery("#messages").prepend(`<li><span style='font-weight:bold;'>${message.from}:</span> ${message.text}</li>`);
});

socket.on("newLocationMessage",function(message){
    var li=jQuery("<li></li>");
    var a=jQuery('<a target="_blank">My current location</a>');
    li.html(`<span style='font-weight:bold;'>${message.from}:</span>  `);
    a.attr("href",message.url);
    li.append(a);
    jQuery('#messages').prepend(li);
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
    var messageTextBox=jQuery('[name=message]');
    socket.emit("createMessage",{
        from:"User",
        text:messageTextBox.val()
    },function(){
        messageTextBox.val('');
    });
});

var locationButton=jQuery("#send-location");
locationButton.on('click',()=>{
    if(!navigator.geolocation)
        return alert("Geolocation is not supported by your browser");
    locationButton.attr('disabled','disabled').text('sending location...');
    navigator.geolocation.getCurrentPosition(position=>{
       socket.emit('createLocationMessage',{
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
       });
     },()=>{
        //locationButton.removeAttr('disabled');
        alert("unable to fetch geolocation");
        //locationButton.text('v');
    });
    locationButton.removeAttr('disabled').text('Send Location');
});
//https://www.google.com/maps?q=21.1591168,72.76871679999999