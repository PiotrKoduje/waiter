import styles from './TableGeneral.module.scss';
import { Card, Button } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeTableRequest } from '../../../redux/tablesRedux';

const TableGeneral = ({ id, status }) => {

  const dispatch = useDispatch();

  const handleRemoveButton = (id) => {
    dispatch(removeTableRequest(id));
  };
  
    return (
      <Card className="w-100 py-3 card border-0 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div className={styles.descriptions}>
            <span className='fs-4 fw-bold'>Table {id}</span>
            <span className="ms-3"><span className='fw-bold'>Status: </span>{status}</span>
          </div>
          <div>
            <Button as={NavLink} to={`/table/${id}`} variant="primary">Show more</Button>
            <Button className={styles.removeButton} onClick={() => handleRemoveButton(id)} variant="danger">X</Button>
          </div>
        </div>
      </Card>
    );
  };
  
  export default TableGeneral;
