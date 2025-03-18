import styles from './Home.module.scss';
import PageTitle from '../../views/PageTitle/PageTitle';
import TableGeneral from '../../features/TableGeneral/TableGeneral';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux';



const Home = () => {
  const tables = useSelector(getAllTables);

  return(
    <>
      <PageTitle>All tables</PageTitle>
      <ul className={styles.tables}>
        {tables.map(table =><TableGeneral key={table.id} id={table.id} status={table.status} />)}
      </ul>
    </>
    
  )
};

export default Home;