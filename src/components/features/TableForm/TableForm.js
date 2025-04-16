import styles from './TableForm.module.scss';
import PageTitle from '../../views/PageTitle/PageTitle';
import { Button, Container, Form, InputGroup, Row, Col, } from 'react-bootstrap';
import { useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import Info from '../../views/Info/Info';
import { useNavigate } from 'react-router-dom';
import { addTableRequest } from '../../../redux/tablesRedux';

const TableForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [peopleAmount, setPeopleAmount] = useState(0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState( 0);
  const [status, setStatus] = useState('Free');
  const [bill] = useState(0);

  const [info, setInfo] = useState(false);
  const [message, setMessage] = useState('');
  const [timeoutId, setTimeoutId] = useState(null)
  
  // HANDLERS
  const handleMaxPeopleChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 10) {
      setMaxPeopleAmount(value);
    }
    if (value < peopleAmount) {
      setPeopleAmount(value);
    }
  }

  const handlePeopleChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 10) {
      setPeopleAmount(value);
    }
    if(value > maxPeopleAmount){
      setPeopleAmount(maxPeopleAmount)
    }
  };

  const confirmation = () => {
    setMessage(`New table successully added!`);
    setInfo(true);
    setTimeoutId(setTimeout(() => {
      setInfo(false);
      navigate('/');
    }, 1500));
   };

   useEffect(() => {
    return () =>{
      if(timeoutId) clearTimeout(timeoutId);
    }
   }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTableRequest({status, peopleAmount, maxPeopleAmount, bill}, confirmation));
   }; 


  return(
    <Container>
      <PageTitle>Add new table</PageTitle>
      <Form className={styles.formContainer} onSubmit={handleSubmit}>

        {/* STATUS */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Status:</Form.Label>
          <Col sm="9">
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Free">Free</option>
              <option value="Busy">Busy</option>
              <option value="Reserved">Reserved</option>
              <option value="Cleaning">Cleaning</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* PEOPLE */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3" className="me-3">People:</Form.Label>
          <Col sm="8">
            <InputGroup>
              <Form.Control type="text" className='text-center' value={peopleAmount} onChange={handlePeopleChange} />
              <InputGroup.Text>/</InputGroup.Text>
              <Form.Control type="text" className='text-center' value={maxPeopleAmount} onChange={handleMaxPeopleChange} />
            </InputGroup>
          </Col>
        </Form.Group>

        {/* BUTTON */}
        <Button type="submit" variant="primary" className="w-50">
          Add
        </Button>

      </Form>
      { info ? <Info>{message}</Info> : null}
    </Container>  
  )   
};

export default TableForm;