const moment=require("moment");
// var date=moment();
// date.add(1,'day');
// console.log(date.format('MMM Do, YYYY'));
var createdAt=1234;
var date=moment(createdAt);
var someTimestamp=moment().valueOf();
//console.log(someTimestamp);
console.log(date.format('MMM Do, YYYY h:mm a'));