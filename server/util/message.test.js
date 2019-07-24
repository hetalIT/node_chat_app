const expect=require("expect");
const {generateMessage}=require("./message");
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