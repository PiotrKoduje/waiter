import styles from './TableDetails.module.scss';
import PageTitle from '../../views/PageTitle/PageTitle';
import { Button, Container, Form, InputGroup, Row, Col, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';
import { useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { updateTableRequest } from '../../../redux/tablesRedux';
import Info from '../../views/Info/Info';
import { useNavigate } from 'react-router-dom';

const TableDetails = () => {

  const navigate = useNavigate();
  let timeoutId;
  const dispatch = useDispatch();
  
  let { id }  = useParams();
  id = Number(id);

  let table = useSelector(state => getTableById(state, id))

  // LOCAL STATE
  const [peopleAmount, setPeopleAmount] = useState(table?.peopleAmount || 0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table?.maxPeopleAmount || 0);
  const [status, setStatus] = useState(table?.status || '');
  const [bill, setBill] = useState(table?.bill || 0);
  const [info, setInfo] = useState(false);
  const [message, setMessage] = useState('');

  // USEEFFECTS
  useEffect(() => {
    if (table) {
      setPeopleAmount(table.peopleAmount);
      setMaxPeopleAmount(table.maxPeopleAmount);
      setStatus(table.status);
      setBill(table.bill);
    }
  }, [table]);

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (status === "Cleaning" || status === "Free") {
      setPeopleAmount(0);
    }
  }, [status]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (table === undefined) {
        navigate('/');
      }
    }, 500);

    return () => clearTimeout(timeoutId); 
  }, [table, navigate]);

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

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    if (value !== 'Busy'){
      setBill(0);
    }
  };

  const handleBillChange = (e) => {
    const value = e.target.value;
    if(/^\d*\.?\d{0,2}$/.test(value))
      setBill(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTableRequest({id, status, peopleAmount, maxPeopleAmount, bill}, confirmation));
   }; 

   const confirmation = () => {
    setMessage(`Table ${id} successully updated!`);
    setInfo(true);
    timeoutId = setTimeout(() => {
      setInfo(false);
      navigate('/');
    }, 1500);
   };

  return(
    <Container>
      <PageTitle>Table {id}</PageTitle>

      {!table ? (<Spinner />) : (

      <Form className={styles.formContainer} onSubmit={handleSubmit}>
        {/* STATUS */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Status:</Form.Label>
          <Col sm="9">
            <Form.Select value={status} onChange={handleStatusChange}>
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
              <Form.Control type="text" className='text-center' value={bill} onChange={handleBillChange}/>
            </InputGroup>
          </Col>
        </Form.Group>)
        }

        {/* BUTTON */}
        <Button type="submit" variant="primary" className="w-50">
          Update
        </Button>
      </Form>)}
      { info ? <Info>{message}</Info> : null}
    </Container> 
  )
};

export default TableDetails;



 