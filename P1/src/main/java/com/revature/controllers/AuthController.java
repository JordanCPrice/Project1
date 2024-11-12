package com.revature.controllers;

import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.services.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    private AuthService aService;

    @Autowired
    public AuthController(AuthService aService){
        this.aService = aService;
    }

    //uninitialized HttpSession (fills upon successful login)
    public static HttpSession session;


    //Our HTTP session is coming in via parameters
    // The session in the parameters is not the same as the static session above
    @PostMapping
    public ResponseEntity<OutgoingUserDTO> login(@RequestBody LoginDTO lDTO, HttpSession session){

        // Send loginDTO to service, getting us an outuser
        OutgoingUserDTO uDTO = aService.login(lDTO,session);

        // The session get initialized and filled with user data in the service layer

        // if we get here, login was successful and session was created
        return ResponseEntity.ok(uDTO);
    }

    //Exception Handler for IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e) {
        //Return a 400 (BAD REQUEST) status code with the exception message
        return ResponseEntity.status(400).body(e.getMessage());
    }

}
