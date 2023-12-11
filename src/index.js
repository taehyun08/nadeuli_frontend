import React from 'react';
import ReactDOM from 'react-dom/client';
//redux를통해 전역 상태관리
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
//redux의 state를 저장하는 .js import
import store from './redux/configStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //각 컴포넌트에서 const 변수명 = useSelector ((state) => state);
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
