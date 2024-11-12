// Where managers get directed to after login.

import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const User:React.FC = () => {

    //useNavigate allows us to programatically switch between components
    const navigate = useNavigate()




    return(

        <Container>
            <h2>Manager Dashboard</h2>
            <p>Select an option below:</p>

            <Button className="btn-primary m-2" onClick={() => navigate("/list-users")}>View All Users</Button>
            <Button className="btn-primary m-2" onClick={() => navigate("/list-reimbursements")}>View All Reimbursements</Button>
            
        </Container>

    )
}