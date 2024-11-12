import axios from "axios"
import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"



export const Register:React.FC = () => {


    const [user, setUser] = useState({
        username:"",
        password:"",
        firstName:"",
        lastName:""
    })

    const navigate = useNavigate()

    // Function to store values when an input box changes
    const storeValues = (input:any) => {
        
        const name = input.target.name // the name of the input box that changed (username, password, firstName,lastName fields)
        const value = input.target.value // the value in the input box

        //input = the entire event (which got passed in as an argument)
        //target = the specfic input box that triggereed the onChange event
        // name/value = the name/ value of the box

        // Take whatever input was changed, and set the matching field in user to the value in the field in the input
        // The spread operator (...) allows us to access the values of the object individually
        // [name] allows us to use this same line for username, password, first, and lastname
        setUser((user) => ({...user, [name]:value}))
        
    }

    // Function that sends the username/password to the backend
    const register = async () => {

        // POST request send to the backend
        const response = await axios.post("http://localhost:7777/users", user)
        
        
    }

    //Used so when you register a new employee you dont have to manually navigate back after registering
    const handleButtonClick = async () => {
        // 1. Execute the register method
        await register();
    
        // 2. After registration, navigate to the next page
        navigate("/");  
      }


    return(

        /* what's my and mx? this is margin for y and x axis
        we set my-5 so that we have a decent amount of space away from the top of the page
        mx-auto centers the content horizontally */
        <Container className="my-5 mx-auto">
            <div>
                <h1>New here? Create an Account for free!</h1>

                <div>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={storeValues}
                    />
                </div>
                <div>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={storeValues}
                    />
                </div>
                <div>
                    <Form.Control
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        onChange={storeValues}
                    />
                </div>
                <div>
                    <Form.Control
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        onChange={storeValues}
                    />
                </div>

                <div>
                    <Button className="btn-success m-1" onClick={handleButtonClick}>Register</Button>
                    <Button className="btn-dark" onClick={()=>navigate("/")}>Back</Button>
                </div>
            </div>
        </Container>

    )
}