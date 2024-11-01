package com.revature.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // combines @Controller (1 of the 4 stereotype annotations and ResponseBody (allows us to convert Responses to JSON)
@RequestMapping("/users") // any HTTP requests with "/users" path will be directed here
public class UserController {
}
