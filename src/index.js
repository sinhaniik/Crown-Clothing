import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { store, persistor } from './component/store/store';

import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/firebase/stripe/stripe.utils';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<BrowserRouter>
				<Elements stripe={stripePromise}>
					<App />
				</Elements>
			</BrowserRouter>
		</PersistGate>
	</Provider>
	// </React.StrictMode>
);

reportWebVitals();
