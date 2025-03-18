import styles from './Footer.module.scss';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return(
    <footer className='text-center py-3 text-secondary fs-6 mt-4'>
      <Container>
        Copyright &copy; PizzeriaApp 2025
      </Container>
    </footer>
  );
};

export default Footer;