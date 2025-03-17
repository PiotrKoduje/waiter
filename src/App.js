import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import AllTables from './components/pages/AllTables/AllTables';
import Table from './components/pages/Table/Table';
import NotFound from './components/pages/NotFound/NotFound';


const App = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<AllTables />}/>
        <Route path="/table/:id" element={<Table />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Container>
    
  );
}

export default App;
