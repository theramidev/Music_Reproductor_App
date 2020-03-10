import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './redux/reducers';
import reduxThunk from 'redux-thunk';

const store = createStore(
  reducers, // Todos los reducers
  {}, // Estado inicial,
  applyMiddleware(reduxThunk),
);

export {store, Provider};
