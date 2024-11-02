package com.revature.services;

import com.revature.daos.UserDAO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service // Registers class as a bean, 1 of the 4 stereotype annotations.
public class UserService {

    private UserDAO uDAO;

    @Autowired // Constructor Injection
    public UserService(UserDAO userDAO){
        this.uDAO = userDAO;
    }

    public User register(User newUser){

        if(newUser.getUsername() == null || (newUser.getUsername().isBlank())){
            // The controller will need to handle this exception
            throw new IllegalArgumentException("Username cannot be blank");
        }
        //.save() is the Jpa method that inserts data into the DB
        //Also returns the object
        return uDAO.save(newUser);
    }

    public List<OutgoingUserDTO> getAllUsers(){

        // Populate a list with all users, .findAll() returns all records in a table
        List<User> users = uDAO.findAll();

        //Create an empty list that we can add users without password info to
        List<OutgoingUserDTO> outUsers = new ArrayList<OutgoingUserDTO>();

        // Loop through users list adding them to outUsers list
        for (User user: users){
            outUsers.add(new OutgoingUserDTO(user.getUserId(), user.getFirstName(), user.getLastName(), user.getUsername(), user.getRole()));
        }

        // Return each user with all info except password
        return outUsers;
    }


}
