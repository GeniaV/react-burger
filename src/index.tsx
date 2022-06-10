import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/app/app';
import { store } from './services/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
