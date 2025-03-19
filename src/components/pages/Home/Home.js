import styles from './Home.module.scss';
import PageTitle from '../../views/PageTitle/PageTitle';
import TableGeneral from '../../features/TableGeneral/TableGeneral';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux';
import { Container } from 'react-bootstrap';

const Home = () => {
  const tables = useSelector(getAllTables);

  return(
    <Container>
      <PageTitle>All tables</PageTitle>
      <ul className={styles.tables}>
        {tables.map(table =><li key={table.id}><TableGeneral id={table.id} status={table.status} /></li>)}
      </ul>
    </Container>
  )
};

export default Home;