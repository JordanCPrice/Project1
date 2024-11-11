package com.revature.services;

import com.revature.controllers.AuthController;
import com.revature.daos.AuthDAO;
import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private AuthDAO aDAO;

    @Autowired
    public AuthService(AuthDAO aDAO){
        this.aDAO = aDAO;
    }

    public OutgoingUserDTO login (LoginDTO lDTO, HttpSession session){

        // use the DTO data to find a user in the DB (through the DAO)
        User u = aDAO.findByUsernameAndPassword(lDTO.getUsername(), lDTO.getPassword());

        // if no user is found, throw an exception
        if (u == null){
            throw new IllegalArgumentException("No user found with those credentials!");
        }

        // if a user is found, login was successful, initialize our session.
        // We are using the session that lives on the controller layer
        AuthController.session = session;


        // Store the user info in the session
        session.setAttribute("userId", u.getUserId());
        session.setAttribute("FirstName", u.getFirstName());
        session.setAttribute("lastName", u.getLastName());
        session.setAttribute("username", u.getUsername());
        session.setAttribute("role", u.getRole());

        //Process the User into an OutgoingUserDTO and return it
        return new OutgoingUserDTO(u.getUserId(),u.getFirstName(),u.getLastName(),u.getUsername(),u.getRole());
    }

}
