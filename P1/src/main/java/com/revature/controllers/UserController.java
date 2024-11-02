package com.revature.controllers;

import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // combines @Controller (1 of the 4 stereotype annotations and ResponseBody (allows us to convert Responses to JSON)
@RequestMapping("/users") // any HTTP requests with "/users" path will be directed here
public class UserController {

   private UserService uService;

   @Autowired
    public UserController(UserService uService){
        this.uService = uService;
    }

    // Post request to add a new User
    @PostMapping // Post requests to /users will come here
    public ResponseEntity<User> registerUser(@RequestBody User newUser){
       // Request body converts the JSON in the HTTP request to a User object

        // Sends the newUser object to the register method in UserService to insert and save the user to DB.
        User u = uService.register(newUser);

        //Return the saved user with a 201 status code (201 - CREATED)
        return ResponseEntity.status(201).body(u);
    }

    // Get request to  get all users
    @GetMapping // Get request to /users will come here
    public ResponseEntity<List<OutgoingUserDTO>> getAllUsers(){

       List<OutgoingUserDTO> allUsers = uService.getAllUsers();

       return ResponseEntity.ok(allUsers);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<User> deleteByUserId(@PathVariable int userId){
       return ResponseEntity.ok(uService.deleteUserById(userId));
    }
    @PatchMapping("/{userId}")
    public ResponseEntity<User> updateUserRole(@PathVariable int userId){
       return ResponseEntity.status(202).body(uService.updateUserRole(userId));
    }


    //Exception handler for IllegalArgumentExceptions thrown in UserService
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e){
       // Return a 400 status code (BAD REQUEST) and the exception message
       return ResponseEntity.status(400).body(e.getMessage());
    }
}
