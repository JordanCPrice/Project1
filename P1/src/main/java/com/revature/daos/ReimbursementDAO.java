package com.revature.daos;

import com.revature.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository // Makes this class a bean (1 of the 4 Stereotype annotations)
public interface ReimbursementDAO extends JpaRepository<Reimbursement, Integer> {

    //Find all Reimbursements by UserId
    //Custom method will need to look at the User object's userId in reimbursement
    //"UserUserId" tells spring to look in the user object for the UserId
    public List<Reimbursement> findByUserUserId(int userId);

    public List<Reimbursement> findByUserUserIdAndStatus(int userId, String status);

    public Reimbursement findByUserUserIdAndReimbId(int userId, int reimbID);
}
