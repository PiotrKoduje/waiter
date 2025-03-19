import styles from './TableDetails.module.scss';
import PageTitle from '../../views/PageTitle/PageTitle';
import { Button, Container, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';
import { useState,useEffect} from 'react';

const TableDetails = () => {
  
  let { id }  = useParams();
  id = Number(id);

  let table = useSelector(state => getTableById(state, id))

  const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount);
  const [status, setStatus] = useState(table.status);
  const [bill, setBill] = useState(table.bill);

  useEffect(() => {
    if (status === "Cleaning" || status === "Free") {
      setPeopleAmount(0);
    }
  }, [status]);
  

  const handleSubmit = (e) => {
   e.preventDefault();
   console.log('status: ', status, 'peopleAmount: ',peopleAmount, 'maxPeopleAmount:', maxPeopleAmount, 'bill: ', bill );
  }; 

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

  return(
    <Container>
      <PageTitle>Table {id}</PageTitle>
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

        {/* BILL */}
        {status === 'Busy' && 
          (<Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Bill:</Form.Label>
          <Col sm="9">
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control type="text" className='text-center' value={bill} onChange={(e) => setBill(e.target.value)}/>
            </InputGroup>
          </Col>
        </Form.Group>)
        }

        {/* BUTTON */}
        <Button type="submit" variant="primary" className="w-50">
          Update
        </Button>
      </Form>
    </Container> 
  )
};

export default TableDetails;



 