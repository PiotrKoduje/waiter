import styles from './NavBar.module.scss';
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return(
    <Navbar bg="primary" variant="dark" className='rounded-2 mt-3 mb-3'>
      <Container>
      <span className="navbar-brand text-white">Waiter.app</span>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;