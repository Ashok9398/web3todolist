// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract TodoApp{
    address owner;
    struct Task{
        string task;
        bool isdone;
    }
    constructor(){
        owner = msg.sender;
    }
    mapping(address => Task[]) private users;
    function addTask(string calldata _task) external {
        users[msg.sender].push(Task({
            task: _task,
            isdone : false
        }));

    }
    function viewTask(uint index)external view returns(Task memory){
        return users[msg.sender][index];
    }
    function updateStatus(uint index , bool _status) external {
        users[msg.sender][index].isdone = _status;
    }
    function deleteTask(uint index) external{
        delete users[msg.sender][index];
    }
    function getTaskCount() external view returns(uint){
        return users[msg.sender].length;
    }
    function getOwner() external view  returns(address){
        return owner;
    }
}
