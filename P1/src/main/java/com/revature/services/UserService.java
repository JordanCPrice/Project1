package com.revature.services;

import com.revature.daos.UserDAO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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



}
