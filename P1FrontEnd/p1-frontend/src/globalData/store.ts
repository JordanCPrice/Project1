// Basic implementation of a store, which is basically global data storage.

// And data that we want to use throughout the entire app, can reside here

// An object that stores other objects or standalone variables
export const store:any = {


    // Let's store loggedInUserinfo (filled after successful login)
    loggedInUser:{
        userId: 0,
        username: "",
        role:""
    }



}