// selectors
export const getAllTables = state => state.tables;
export const getTableById = (state, id) => state.tables.find(table => table.id === id);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');
const ADD_TABLE = createActionName('ADD_TABLE');

//action creator
export const update_tables = payload => ({type: UPDATE_TABLES, payload});
export const update_table = payload => ({type: UPDATE_TABLE, payload});
export const remove_table = payload => ({type: REMOVE_TABLE, payload});
export const add_table = payload => ({type: ADD_TABLE, payload});

export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tables')
    .then(res => res.json())
    .then(tables => dispatch(update_tables(tables)));
  };
};

export const updateTableRequest = (updatedTable, confirmation) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedTable)
    };
    
    fetch(`http://localhost:3131/api/tables/${updatedTable.id}`, options)
    .then((res) => {
      if(!res.ok){
        throw new Error(`Error. Status: ${res.status}`);
      }
      return res.json();        
    })
    .then((table) => {
      dispatch(update_table(table))
    })
    .then(confirmation)
    .catch((error) => console.log('Error: ', error))
  };

};

export const removeTableRequest = (idToRemove) => {
  return (dispatch) => {
    fetch(`http://localhost:3131/api/tables/${idToRemove}`, {
      method: 'DELETE'
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error. Status: ${res.status}`);
      }
      return res.json();
    })
    .then(dispatch(remove_table(idToRemove)))
    .catch((error) => console.log('Error: ', error))
  }
};

export const addTableRequest = (newTable, confirmation) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newTable)
    };

    fetch('http://localhost:3131/api/tables', options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error. Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      dispatch(add_table(data));
    })
    .then(confirmation)
  }
};

const tablesReducer = (statePart=[], action) => {
  switch(action.type){
    case UPDATE_TABLES:
      return [ ...action.payload]
    case UPDATE_TABLE:
      return statePart.map(table => table.id === action.payload.id ? action.payload : table);
    case REMOVE_TABLE:
      return statePart.filter(table => table.id !== action.payload);
    case ADD_TABLE:
      return [ ...statePart, action.payload ]
    default:
      return statePart;
  };
};

export default tablesReducer;