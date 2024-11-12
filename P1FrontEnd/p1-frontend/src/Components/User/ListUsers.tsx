import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Card, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { UserTable } from "./UserTable"
import { store } from "../../globalData/store"

export const ListUsers:React.FC = () => {

    //useNavigate allows us to programatically switch between components
    const navigate = useNavigate()

    
    const [user, setUser] = useState([])

    useEffect(() => {
        // Check if the logged-in user is a manager
        if (store.loggedInUser?.role !== "manager") {
          alert("You do not have permission to view this page.");
        } else {
          getAllUsers(); // Only fetch users if the logged-in user is a manager
        }
      }, [])

    const getAllUsers = async () => {
        try {
            // Fetch all reimbursements
            const response = await axios.get("http://localhost:7777/users")
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching all users", error)
        }
    }

    const removeUser = async (id: number) => {
        try {
          await axios.delete(`http://localhost:7777/users/${id}`)
          // After successful deletion, fetch the updated list of users
          getAllUsers()
        } catch (error) {
          console.error("Error removing user", error);
        }
      }

      const promoteUser = async (id: number) => {
        try {
          // Send a PATCH request to update the user's role to "Manager"
          await axios.patch(`http://localhost:7777/users/${id}`, { role: "Manager" })
          // After successful promotion, fetch the updated list of users
          getAllUsers()
        } catch (error) {
          console.error("Error promoting user", error);
        }
      }





    return(
        <Container className="mt-5">
        <Card className="shadow-lg p-4">
          <Card.Header className="bg-primary text-white text-center">
            <h2 className="display-6">All Users</h2>
          </Card.Header>
          <Card.Body>
            <UserTable
              users={user}
              onRemove={removeUser}  // Pass removeUser function as prop
              onPromote={promoteUser}  // Pass promoteUser function as prop
            />
            <div className="d-flex justify-content-end mt-3">
              <Button variant="primary" onClick={() => navigate("/users")}>Go Back</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
  
    )
}