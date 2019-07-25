const expect=require("expect");
const {generateMessage,generateLocationMessage}=require("./message");
describe("generateMessage",()=>{
    it("should generate a correct message",()=>{
        var from="hetal",text="testing app";
        var res=generateMessage(from,text);
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(typeof res.createdAt).toBe('number');
        expect(res).toMatchObject({from,text});
    });
});

describe("generateLocationMessage",()=>{
    it("should generate correct location object",()=>{
        var from='admin';
        var latitude=21.1591168,longitude=72.76871679999999;
        var res=generateLocationMessage(from,latitude,longitude);
        expect(res.from).toBe(from);
        expect(typeof res.createdAt).toBe('number');
        expect(res.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
    });
});//https://www.google.com/maps?q=21.1591168,72.76871679999999