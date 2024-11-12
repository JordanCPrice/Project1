import { Button, Container, Form, Table } from "react-bootstrap";
import { store } from "../../globalData/store";
import { useEffect, useState } from "react";
import axios from "axios";

// The main Employee component
export const Employee: React.FC = () => {

    const [reimbursement, setReimbursement] = useState({
        description: "",
        amount: 0,
        userId: store.loggedInUser.userId
    });

    const [reimbursements, setReimbursements] = useState<any[]>([]); // Store reimbursements list
    const [showPending, setShowPending] = useState(false); // To toggle between pending and all
    const [editMode, setEditMode] = useState(false); // To manage edit mode
    const [selectedReimbursement, setSelectedReimbursement] = useState<any>(null); // Store selected reimbursement

    useEffect(() => {
        getByUserId(); // Get reimbursements when the component mounts
    }, []);

    // Store values from form inputs
    const storeValues = (input: any) => {
        const name = input.target.name;
        const value = input.target.value;
        setReimbursement((prevReimbursement) => ({
            ...prevReimbursement,
            [name]: name === "amount" ? Number(value) : value
        }));
    };

    // Submit new reimbursement
    const submit = async () => {

        if (!reimbursement.description || !reimbursement.amount || reimbursement.amount <= 0) {
            alert("Please fill in all the fields with valid values.");
            return;
        }
        const response = await axios.post("http://localhost:7777/reimbursements", reimbursement);
        getByUserId(); // Reload reimbursements
    };

    // Fetch reimbursements based on user ID
    const getByUserId = async () => {
        const response = await axios.get("http://localhost:7777/reimbursements/user/" + store.loggedInUser.userId);
        setReimbursements(response.data);
    };

    // Toggle between showing all and only pending reimbursements
    const togglePending = () => {
        setShowPending((prev) => !prev);
    };

    // Filter reimbursements based on the pending status
    const filteredReimbursements = showPending
        ? reimbursements.filter((r: any) => r.status === "PENDING")
        : reimbursements;

    // Enable edit mode for a reimbursement
    const handleEdit = (reimbursement: any) => {
        setSelectedReimbursement(reimbursement);
        setReimbursement({
            description: reimbursement.description,
            amount: reimbursement.amount,
            userId: reimbursement.userId
        });
        setEditMode(true);
    };

    // Save the updated reimbursement description
    const handleSave = async () => {
        if (selectedReimbursement) {
            // Ensure the request payload is correctly formatted
            const response = await axios.patch(
                `http://localhost:7777/reimbursements/user/${store.loggedInUser.userId}/reimbursement/${selectedReimbursement.reimbId}`,
                { description: reimbursement.description }, // Send description as JSON object
                {
                    headers: {
                        "Content-Type": "application/json", // Ensure content type is set to JSON
                    },
                }
            );
            setEditMode(false); // Exit edit mode
            getByUserId(); // Reload reimbursements to reflect the updated description
        }
    };

    return (
        <Container>
            <h2>Employee Dashboard</h2>

            {/* Form for creating a new reimbursement */}
            <Form>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter description"
                    name="description"
                    value={reimbursement.description}
                    onChange={storeValues}
                />

                <Form.Label>Amount</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    name="amount"
                    value={reimbursement.amount}
                    onChange={storeValues}
                />
                <Button onClick={submit}>Submit Reimbursement</Button>
            </Form>
            <br></br>

            {/* Button to toggle between all and pending reimbursements */}
            <Button onClick={togglePending}>
                {showPending ? "Show All" : "Show Pending"}
            </Button>

            {/* Display list of reimbursements */}
            <h3>{showPending ? "Pending Reimbursements" : "Your Reimbursements"}</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        {showPending && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredReimbursements.map((r: any) => (
                        <tr key={r.reimbId}>
                            <td>{r.reimbId}</td>
                            <td>{r.description}</td>
                            <td>{r.amount}</td>
                            <td>{r.status}</td>
                            {showPending && (
                                <td>
                                    <Button onClick={() => handleEdit(r)}>Edit</Button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Reimbursement Form */}
            {editMode && (
                <div>
                    <h4>Edit Reimbursement</h4>
                    <Form>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Update description"
                            name="description"
                            value={reimbursement.description}
                            onChange={storeValues}
                        />
                        <Button onClick={handleSave}>Save Changes</Button>
                        <Button onClick={() => setEditMode(false)}>Cancel</Button>
                    </Form>
                </div>
            )}
        </Container>
    );
};
