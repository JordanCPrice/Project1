package com.revature.P1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.revature.models") // Tells Spring Boot to look in the models package for DB entities
@ComponentScan("com.revature") // Tells Spring Boot to look in com.revature for Beans (Stereotype annotations)
@EnableJpaRepositories("com.revature.daos") // Tells Spring Boot to look in the DAOs package for JPARepositories
public class P1Application {

	public static void main(String[] args) {
		SpringApplication.run(P1Application.class, args);


	}

}
