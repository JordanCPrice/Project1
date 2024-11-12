import { Button, Container, Table } from "react-bootstrap"

interface User {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    role: string;
  }
  
  interface UserTableProps {
    users: User[];
    onRemove: (id: number) => void;
    onPromote: (id: number) => void;
  }

export const UserTable: React.FC<UserTableProps> = ({ users, onRemove, onPromote }) => { {



    return(
        <Container>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>User Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="warning" onClick={() => onPromote(user.userId)}disabled={user.role === "manager"}>Promote to Manager</Button>
                  <Button variant="danger" className="ms-2"onClick={() => onRemove(user.userId)}> Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

    )
}
}