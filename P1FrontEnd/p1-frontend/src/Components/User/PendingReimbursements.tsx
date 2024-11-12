import { Card, Button } from 'react-bootstrap';

export const PendingReimbursements = ({ reimbursements, onEdit }: any) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Pending Reimbursements</Card.Title>
        {reimbursements.length > 0 ? (
          reimbursements.map((reimbursement: any) => (
            <div key={reimbursement.id} className="mb-3">
              <div><strong>ID:</strong> {reimbursement.id}</div>
              <div><strong>Description:</strong> {reimbursement.description}</div>
              <div><strong>Status:</strong> {reimbursement.status}</div>
              <Button onClick={() => onEdit(reimbursement)} variant="primary">
                Edit Description
              </Button>
            </div>
          ))
        ) : (
          <p>No pending reimbursements found.</p>
        )}
      </Card.Body>
    </Card>
  );
};
