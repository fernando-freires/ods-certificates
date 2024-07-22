// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract User {

    struct UserData {
        string name;
        string email;
        string cpf;
    }

    mapping(address => UserData) public users;
    mapping(address => bool) public registeredUsers;

    event UserRegistered(address userAddress, string name, string email);
    event UserUpdated(address userAddress, string name, string email);

    modifier userNotRegistered(address userAddress, string memory cpf) {
        require(!registeredUsers[userAddress], "User already registered");
        require(!(keccak256(bytes(users[userAddress].cpf)) == keccak256(bytes(cpf))), "CPF already in use");
        _;
    }

    modifier userRegistered(address userAddress) {
        require(registeredUsers[userAddress], "User is not registered");
        _;
    }

    function registerUser(address userAddress, string memory name, string memory email, string memory cpf) public userNotRegistered(userAddress, cpf) {
        users[userAddress] = UserData(name, email, cpf);
        registeredUsers[userAddress] = true;
        emit UserRegistered(userAddress, name, email);
    }

    function updateUser(address userAddress, string memory name, string memory email, string memory cpf) public userRegistered(userAddress) {
        users[userAddress] = UserData(name, email, cpf);
        emit UserUpdated(userAddress, name, email);
    }

    function getUser(address userAddress) public view returns (string memory name, string memory email, string memory cpf) {
        require(registeredUsers[userAddress], "User is not registered");
        UserData storage user = users[userAddress];
        return (user.name, user.email, user.cpf);
    }

    function isUserRegistered(address userAddress) public view returns (bool){
        return registeredUsers[userAddress];
    }
}
