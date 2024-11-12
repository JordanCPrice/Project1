import { Button, Container, Table } from "react-bootstrap";

export const ReimbursementTable: React.FC<{ reimbursements: any[], updateReimbursementStatus: (reimbId: number, status: string) => void }> = ({ reimbursements, updateReimbursementStatus }) => {

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Reimbursement Id</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reimbursements.map((reimbursement: any) => (
            <tr key={reimbursement.reimbId}>
              <td>{reimbursement.reimbId}</td>
              <td>{reimbursement.description}</td>
              <td>{reimbursement.amount}</td>
              <td>{reimbursement.status}</td>
              <td>
                {reimbursement.status === "PENDING" && (
                  <>
                    <Button
                      onClick={() => updateReimbursementStatus(reimbursement.reimbId, 'APPROVED')}
                      className="btn-success m-1"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => updateReimbursementStatus(reimbursement.reimbId, 'DENIED')}
                      className="btn-danger m-1"
                    >
                      Deny
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
