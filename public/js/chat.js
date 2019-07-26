//const moment = require("moment");

var socket=io();
function scrollToBottom(){
    var messages=jQuery('#messages');
    var newMessage=messages.children('li:last-child');
    var clientHeight=messages.prop('clientHeight');
    var scrollTop=messages.prop('scrollTop');
    var scrollHeight=messages.prop('scrollHeight');
    var newMessageHeight=newMessage.innerHeight();
    var lastMessageHeight=newMessage.prev().innerHeight();
    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight)
    {
        // console.log(clientHeight);console.log(scrollTop);console.log(lastMessageHeight);console.log(newMessageHeight);console.log(scrollHeight);
        // console.log(clientHeight+scrollTop+newMessageHeight+lastMessageHeight);
        messages.scrollTop(scrollHeight);
    }
}
socket.on("connect",()=>{
    var params=jQuery.deparam(window.location.search);
    socket.emit('join',params,function(err){
        if(err)
        {
            alert(err);
            window.location.href='/';
        }
        else
        {
            console.log("no error");
        }
    });
});
socket.on("disconnect",()=>{
    console.log("disconnected from the server");
});

socket.on("newMessage",function(message){
    var template=jQuery("#message-template").html();
    var formattedTime=moment().format('h:mm a');
    var html=Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formattedTime
    });
    jQuery("#messages").append(html);
    scrollToBottom();
    // var formattedTime=moment().format('h:mm a');
    // jQuery("#messages").prepend(`<li><span style='font-weight:bold;'>${message.from} ${formattedTime}:</span> ${message.text}</li>`);
});

socket.on("newLocationMessage",function(message){
    var template=jQuery("#location-message-template").html();
    var formattedTime=moment().format('h:mm a');
    var html=Mustache.render(template,{
        from:message.from,
        url:message.url,
        createdAt:formattedTime
    });
    // var li=jQuery("<li></li>");
    // var a=jQuery('<a target="_blank">My current location</a>');
    // li.html(`<span style='font-weight:bold;'>${message.from} ${foemattedTime}:</span>  `);
    // a.attr("href",message.url);
    // li.append(a);
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('updateUserList',users=>{
    var ol=jQuery("<ol></ol>");
    users.forEach(user => {
        ol.append(jQuery("<li></li>").text(user));
    });
    jQuery("#users").html(ol);
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