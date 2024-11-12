import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReimbursementTable } from "../Reimbursement/ReimbursementTable";

export const ListReimbursements: React.FC = () => {
  const navigate = useNavigate();

  const [reimbursements, setReimbursements] = useState<any[]>([]);
  const [filteredReimbursements, setFilteredReimbursements] = useState<any[]>([]);
  const [originalReimbursements, setOriginalReimbursements] = useState<any[]>([]);

  useEffect(() => {
    getAllReimbursements();
  }, []);

  const getAllReimbursements = async () => {
    try {
      const response = await axios.get("http://localhost:7777/reimbursements");
      setReimbursements(response.data);
      setFilteredReimbursements(response.data);
      setOriginalReimbursements(response.data);
    } catch (error) {
      console.error("Error fetching all reimbursements", error);
    }
  };

  const filterPendingReimbursements = () => {
    const pendingReimbursements = originalReimbursements.filter(
      (reimbursement) => reimbursement.status === "PENDING"
    );
    setFilteredReimbursements(pendingReimbursements);
  };

  const updateReimbursementStatus = async (reimbId: number, status: string) => {
    try {
      // Send just the string status, without wrapping it in an object
      await axios.patch(`http://localhost:7777/reimbursements/${reimbId}`, status, {
        headers: {
          'Content-Type': 'text/plain', // Indicate that we are sending plain text
        }
      });
  
      // Refetch reimbursements after status update
      getAllReimbursements()
    } catch (error) {
      console.error("Error updating reimbursement status", error);
    }
  };

  const showAllReimbursements = () => {
    setFilteredReimbursements(originalReimbursements);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Reimbursements</Card.Title>
              <Row className="mb-3">
                <Col className="text-center">
                  <Button className="m-2" variant="primary" onClick={filterPendingReimbursements}>
                    Show Pending Reimbursements
                  </Button>
                  <Button className="m-2" variant="secondary" onClick={showAllReimbursements}>
                    Show All
                  </Button>
                </Col>
              </Row>
              {/* Pass the correct prop name */}
              <ReimbursementTable reimbursements={filteredReimbursements} updateReimbursementStatus={updateReimbursementStatus} />
              <div className="d-flex justify-content-end mt-3">
                <Button variant="primary" onClick={() => navigate("/users")}>
                  Go Back
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
