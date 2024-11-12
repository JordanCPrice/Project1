package com.revature.controllers;

import com.revature.aspects.AdminOnly;
import com.revature.models.DTOs.DescriptionUpdateDTO;
import com.revature.models.DTOs.IncomingReimbursementDTO;
import com.revature.models.Reimbursement;
import com.revature.services.ReimbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // combines @Controller (1 of the 4 stereotype annotations and ResponseBody (allows us to convert Responses to JSON)
@RequestMapping("/reimbursements") // any HTTP requests with "/reimbursements" path will be directed here
@CrossOrigin // Allows for cross-origin-resource-sharing from any source
public class ReimbursementController {

    private ReimbursementService rService;


    @Autowired
    public ReimbursementController(ReimbursementService rService) {
        this.rService = rService;
    }

    @AdminOnly
    @GetMapping
    public ResponseEntity<List<Reimbursement>> getAllReimbursements(){
        return ResponseEntity.ok(rService.getAllReimbursements());

    }
    @GetMapping("/pending")
    public ResponseEntity<List<Reimbursement>> getPendingReimbursements(){
        return ResponseEntity.ok(rService.getPendingReimbursement());
    }

    @PostMapping
    public ResponseEntity<Reimbursement> submitReimbursement(@RequestBody IncomingReimbursementDTO reimbursementDTO) {

        Reimbursement r = rService.addReimbursement(reimbursementDTO);

        return ResponseEntity.status(201).body(r);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reimbursement>> getReimbursementByUserId(@PathVariable int userId){
        return ResponseEntity.ok(rService.getReimbursementByUserId(userId));
    }

    @GetMapping("/user/{userId}/{status}")
    public ResponseEntity<List<Reimbursement>> getReimbursementByUserIdAndStatus(@PathVariable int userId, @PathVariable String status){
        return ResponseEntity.ok(rService.getReimbursementByUserIdAndStatus(userId,status));
    }

    @PatchMapping("/user/{userId}/reimbursement/{reimbId}")
    public ResponseEntity<Reimbursement> updateReimbursementDescription(@PathVariable int userId, @PathVariable int reimbId, @RequestBody DescriptionUpdateDTO newDescription){
        return  ResponseEntity.status(202).body(rService.updateDescription(userId,reimbId,newDescription.getDescription()));
    }
    @PatchMapping("/{reimbId}")
    public ResponseEntity<Reimbursement> updateReimbursementStatus(@PathVariable int reimbId, @RequestBody String status){
        return  ResponseEntity.ok(rService.updateReimbursementStatus(reimbId,status));
    }


    //Exception Handler for IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e) {
        //Return a 400 (BAD REQUEST) status code with the exception message
        return ResponseEntity.status(400).body(e.getMessage());
    }
}