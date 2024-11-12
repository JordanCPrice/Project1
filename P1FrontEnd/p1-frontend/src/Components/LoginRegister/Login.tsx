import axios from "axios"
import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"

export const Login:React.FC = () => {


    //useNavigate allows us to programatically switch between components
    const navigate = useNavigate()

    // A state component that holds username and password
    const[loginCreds, setLoginCreds] = useState({
        username:"",
        password:""
    })

    //Function that stores user input
    const storeValues = (input:any) => {

        // Check storeValues method in Register.tsx for comments

        const name = input.target.name // the name of the input box that changed (username, password, firstName,lastName fields)
        const value = input.target.value // the value in the input box

        setLoginCreds((loginCreds) => ({...loginCreds, [name]:value}))
    }
    

    const login = async () => {
        // TODO: make sure username/password are inputted first

        // use the username/password in the loginCreds state object
        const response = await axios.post("http://localhost:7777/auth", loginCreds)
        .then(
            //if the request is successful:
            //print the data 
            // save it locally
            // alert the user they logged in
            // navigate to appropriate location based on role

            (response) => {
                console.log(response.data)

                // saving the logged in user data globally
                store.loggedInUser = response.data

                //navigate to /pets 
                navigate("/reimbursements")
            }
        )
        .catch((error)=>{
            alert("Login Failed! Please try again.")
        })
    }






    
    
    return(

        /*Bootstrap gives us this Container element that does some default padding and centering*/
        <Container> 

            <h1>?????????????????????</h1>
                <h3>Please Log In:</h3>
                
                <div>
                    <Form.Control
                        type="text"
                        placeholder="username"
                        name="username"
                        onChange={storeValues}
                    />
                </div>

                <div>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={storeValues}
                    />
                </div>
                

            <Button className="btn-success m-1" onClick={login}>Login</Button>
            <Button className="btn-dark" onClick={()=>navigate("/register")}>Register</Button>
        </Container>


    )

}