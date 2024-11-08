import axios from "axios"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { ReimbursementTable } from "./ReimbursementTable"

export const ReimbursementContainer:React.FC = () => {


    const[reimbursement, setReimbursement] = useState([])

    useEffect(() => {
        getReimbursementByUserId
    }, []) // empty array tells useEffect to trigger on component load

    const getReimbursementByUserId = async () => {


        const response = await axios.get("http://localhost:7777/reimbursements/user/")


        // populate the reimbursement state
        setReimbursement(response.data) // data holds the data sent in the reponse body
    }
    



return(


    <Container>

        <ReimbursementTable reimbursements={reimbursement}></ReimbursementTable>


    </Container>
)

}