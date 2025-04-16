import styles from './NavBar.module.scss';
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return(
    <Navbar bg="primary" variant="dark" className='rounded-2 mt-2 mb-4'>
      <Container>
      <span className="navbar-brand text-white">Waiter.app</span>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/addTable">Add table</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;