import { Container, Table } from "react-bootstrap"

export const ReimbursementTable:React.FC<{reimbursements:any[]}> = ({reimbursements}) => {



    return(
        <Container>

            <Table>
                <thead>
                    <tr>
                        <th>Reimbursement Id</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reimbursements.map((reimbursements:any)=>(
                        <tr>
                            <td>{reimbursements.reimbId}</td>
                            <td>{reimbursements.description}</td>
                            <td>{reimbursements.amount}</td>
                            <td>{reimbursements.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>


        </Container>

    )
}