import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {IconContext} from "react-icons";

const newDiv = document.createElement('div')
newDiv.setAttribute('id','frontEnd')
document.getElementsByTagName('body')[0].appendChild(newDiv)
const root = ReactDOM.createRoot(
    document.getElementById('frontEnd')
);
root.render(
    <React.StrictMode>
        <IconContext.Provider value={{style: {verticalAlign: 'middle',width:'100%',height:'100%'}}}>
            <App/>
        </IconContext.Provider>
    </React.StrictMode>
);
reportWebVitals();