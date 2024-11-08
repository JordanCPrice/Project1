import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const Login:React.FC = () => {


    //useNavigate allows us to programatically switch between components
    const navigate = useNavigate()






    
    
    return(

        /*Bootstrap gives us this Container element that does some default padding and centering*/
        <Container> 

            <h1>Welcome to the Pet Shop</h1>
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