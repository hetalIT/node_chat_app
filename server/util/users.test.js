const expect=require("expect");
const {Users}=require("./users");

describe("Users",()=>{
    var users;
    beforeEach(()=>{
        users=new Users();
        users.users=[{
            id:'1',
            name:'srd',
            room:'node'
        },
        {
            id:'2',
            name:'nidhi',
            room:'node'
        },
        {
            id:'3',
            name:'neha',
            room:'react'
        }];
    });

    it("should create a new user",()=>{
        var users=new Users();
        var user={
            id:'123',
            name:'hetal',
            room:'nodejs'
        };
        var res=users.addUser(user.id,user.name,user.room);
        expect(res).toEqual(user);
        expect(users.users).toEqual([user]);
    });
    it("should return names for node course",()=>{
        var userList=users.getUserList('node');
        expect(userList).toEqual(['srd','nidhi']);
    });
    it("should return names for react course",()=>{
        var userList=users.getUserList('react');
        expect(userList).toEqual(['neha']);
    });
    it('should remove a user',()=>{
        var user=users.removeUser('3');
        expect(user[0].id).toBe('3');
        expect(users.users.length).toBe(2);
        expect(users.users).toEqual(expect.not.arrayContaining(user));
    });
    it('should not remove user',()=>{
        var user=users.removeUser('11');
        expect(user).toEqual([]);
        expect(users.users.length).toBe(3);
    });
    it("should find user",()=>{
        var user=users.getUser('1');
        expect(user).not.toEqual([]);
        expect(users.users).toEqual(expect.arrayContaining(user));
        expect(user[0].id).toBe('1');
        //expect(users.users).toMatchObject(user);
    });
    it("should not find user",()=>{
        var user=users.getUser('11');
        expect(user).toEqual([]);
    });
});