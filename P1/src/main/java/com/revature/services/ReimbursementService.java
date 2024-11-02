package com.revature.services;

import com.revature.daos.ReimbursementDAO;
import com.revature.daos.UserDAO;
import com.revature.models.DTOs.IncomingReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service // Registers class as a bean, 1 of the 4 stereotype annotations.
public class ReimbursementService {

    private ReimbursementDAO rDAO;
    private UserDAO uDAO; // Need a UserDao object to getUserId

    @Autowired
    public ReimbursementService(ReimbursementDAO rDAO, UserDAO uDAO){
        this.rDAO = rDAO;
        this.uDAO = uDAO;
    }

    // Takes in a new Reimbursement object and inserts it into the DB
    // Using the IncomingReimbursementDTO so we don't have to send a whole User to reimbursement
    public Reimbursement addReimbursement(IncomingReimbursementDTO reimbursementDTO){

        //ReimbursementID will be generated so 0 is just a placeholder
        //Description, amount, status all come from the reimbursementDTO
        // UserId will be set with the userID n the DTO
        Reimbursement newReimbursement = new Reimbursement(0, reimbursementDTO.getDescription(),reimbursementDTO.getAmount(),reimbursementDTO.getStatus(), null);

        // Get user by UserId
        Optional<User> u = uDAO.findById(reimbursementDTO.getUserId());

        //findById is a Spring method that returns an optional
        //It will either hold the value requested or it won't. this helps us avoid NPE (NullPointerExc)
        //We can't access the data without the .get() method
        if (u.isEmpty()){
            throw new IllegalArgumentException("No user found with id: " + reimbursementDTO.getUserId());
        }else{
            // Set the user object in the new Reimbursement
            newReimbursement.setUser(u.get());

            // Send the reimbursement to the DB.
            return rDAO.save(newReimbursement);
        }
    }
    public List<Reimbursement> getReimbursementByUserId(int userId){

        //TODO: error handling
        return rDAO.findByUserUserId(userId);
    }
    public List<Reimbursement> getReimbursementByUserIdAndStatus(int userId, String status){

        //TODO: error handling
        return rDAO.findByUserUserIdAndStatus(userId, status);
    }
    public Reimbursement updateDescription(int userId, int reimbId, String newDescription){

        User u = uDAO.findById(userId).orElseThrow(() -> new IllegalArgumentException("No user found with id: " + userId));

        Reimbursement r = rDAO.findByUserUserIdAndReimbId(userId, reimbId);

        if (r.getStatus().contains("pending")){
            r.setDescription(newDescription);
            rDAO.save(r);
            return r;
        }else{
            throw new IllegalArgumentException("This reimbursement is not currently pending");
        }
    }


}
