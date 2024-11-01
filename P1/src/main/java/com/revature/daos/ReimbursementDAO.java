package com.revature.daos;

import com.revature.models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Makes this class a bean (1 of the 4 Stereotype annotations)
public interface ReimbursementDAO extends JpaRepository<Reimbursement, Integer> {
}
