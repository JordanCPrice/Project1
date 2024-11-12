package com.revature.aspects;


import com.revature.controllers.AuthController;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect // Makes a class an aspect (can trigger functionality at any point in our code)

public class AuthAspect {

    // An advice is the functionality that an aspect can trigger

    // An advice that checks if the user is logged in before they call userController methods
    // EXCEPT for the registerUser method - therefore you can create an account without being logged in.
    @Before("execution(* com.revature.controllers.UserController.*(..)) " +
            "&& !execution(* com.revature.controllers.UserController.registerUser(..))")
    public void checkLogin(){

        if(AuthController.session == null){
            throw new IllegalArgumentException("You must be logged in to do this!");
        }

        /*The Exception will not get handled appropriately...
         because this is checked before any controller method runs
         (thus the handler in the controller won't catch it)

         we could do a global exception handler with @ControllerAdvice
         we'll handle errors on the front in the exact same way. so no biggie.*/

    }
    //NOTE: we could have also done "com.revature.controllers.*.*(..)"
    //To apply checkLogin() to all controller methods

    //An Advice that checks for admin privileges before calling methods with @AdminOnly
    @Before("@annotation(com.revature.aspects.AdminOnly)")
    public void checkAdmin() {

        //If the logged in user does not have a role equal to "manager", throw an exception
        if(!AuthController.session.getAttribute("role").equals("manager")){
            throw new IllegalArgumentException("You must be a manager to do this!");
        }

    }
}
