const {ethers } =require('hardhat');
const {expect,assert} = require('chai');
const { isCallTrace } = require('hardhat/internal/hardhat-network/stack-traces/message-trace');

let accounts;
let todoapp;

describe("TODOAPP",()=>{
    beforeEach("Deploys ",async()=>{
        accounts = await ethers.getSigners();
        const dapp = await ethers.getContractFactory("TodoApp");
        todoapp = await dapp.deploy();
    })
    it ("Retrieves smart contract owner",async()=>{
        expect(await todoapp.getOwner()).to.equal(accounts[0].address);
    })
    it("Checks for addTask and view Task method",async()=>{
        await todoapp.addTask("Get Up!");
        const task = await todoapp.viewTask(0);
        expect(task.task).to.equal("Get Up!");
    })
    it("Checks for update Status of tasks",async()=>{
        await todoapp.addTask("Get Up!");
        await todoapp.updateStatus(0,true);
        const task = await todoapp.viewTask(0);
        expect(task.isdone).to.equal(true);
    })
    it("Should test task count and delete task function",async()=>{
        await todoapp.addTask("Get Up!");
        await todoapp.addTask("Brush");
        await todoapp.addTask("Eat Breakfast");
        await todoapp.deleteTask(0);
        const task = await todoapp.viewTask(0);
        expect(task.task).to.equal('');
        expect(await todoapp.getTaskCount()).to.equal(3);
    })

})