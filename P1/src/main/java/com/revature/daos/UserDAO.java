package com.revature.daos;

import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Makes this class a bean (1 of the 4 Stereotype annotations)
public interface UserDAO extends JpaRepository<User, Integer> {

}
