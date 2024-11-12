import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ReimbursementTable } from "./ReimbursementTable";
import { store } from "../../globalData/store";
import { useNavigate } from "react-router-dom";

export const ReimbursementContainer: React.FC = () => {
  
  const [reimbursement, setReimbursement] = useState<any[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    getReimbursementByUserId();
  }, []) // empty array tells useEffect to trigger on component load

  const getReimbursementByUserId = async () => {
    try {
      // Using the loggedInUser's id to get only their reimbursements
      const response = await axios.get(
        `http://localhost:7777/reimbursements/user/${store.loggedInUser.userId}`
      )

      // populate the reimbursement state
      setReimbursement(response.data); // data holds the data sent in the response body
    } catch (error) {
      console.error("Error fetching reimbursements", error)
    }
  }

  const updateReimbursementStatus = async (reimbId: number, status: string) => {
    try {
      // Update reimbursement status
      await axios.patch(`http://localhost:7777/reimbursements/${reimbId}`, {
        status,
      });

      // Re-fetch reimbursements after status update
      getReimbursementByUserId()
    } catch (error) {
      console.error("Error updating reimbursement status", error)
    }
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4">
            <Card.Header className="bg-primary text-white text-center">
              <h2 className="display-6">Reimbursement Details</h2>
            </Card.Header>
            <Card.Body>
              <ReimbursementTable
                reimbursements={reimbursement}
                updateReimbursementStatus={updateReimbursementStatus}
              />
              <div className="d-flex justify-content-end mt-3">
                <Button variant="primary" onClick={() => navigate("/users")}>Go Back</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
