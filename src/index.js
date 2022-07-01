import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/cart.context';
import reportWebVitals from './reportWebVitals';

import { store } from './component/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<CartProvider>
					<App />
				</CartProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
