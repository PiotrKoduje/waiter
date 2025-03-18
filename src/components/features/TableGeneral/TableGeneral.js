import styles from './TableGeneral.module.scss';
import { Card, Button } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

const TableGeneral = ({id, status}) => {
    return (
      <Card className="w-100 p-2 card border-0 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className='fs-4 fw-bold'>Table {id}</span>
            <span className="ms-3"><span className='fw-bold'>Status: </span>{status}</span>
          </div>
          <Button as={NavLink} to={`/table/${id}`} variant="primary">Show more</Button>
        </div>
      </Card>
    );
  };
  
  export default TableGeneral;
