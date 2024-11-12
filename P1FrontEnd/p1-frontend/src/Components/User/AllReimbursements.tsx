import { Card, Button } from 'react-bootstrap';

export const AllReimbursements = ({ reimbursements }: any) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>All Reimbursements</Card.Title>
        {reimbursements.length > 0 ? (
          reimbursements.map((reimbursement: any) => (
            <div key={reimbursement.id} className="mb-3">
              <div><strong>ID:</strong> {reimbursement.id}</div>
              <div><strong>Description:</strong> {reimbursement.description}</div>
              <div><strong>Status:</strong> {reimbursement.status}</div>
            </div>
          ))
        ) : (
          <p>No reimbursements found.</p>
        )}
      </Card.Body>
    </Card>
  );
};
