import { useEffect } from 'react';
import {
	onAuthStateChangedListner,
	createUserDocumentFromAuth
} from './utils/firebase/firebase.utils';

import { useDispatch } from 'react-redux/es/exports';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { setCurrentUser } from './component/store/user/user-action';
import { USER_ACTION_TYPES } from './context/user.contex';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListner((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });

			// console.log(user);
		});

		return unsubscribe;
	}, [dispatch]);

	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index={true} element={<Home />}></Route>
				<Route path='shop/*' element={<Shop />}></Route>
				<Route path='auth' element={<Authentication />}></Route>
				<Route path='checkout' element={<Checkout />}></Route>
			</Route>
			;
		</Routes>
	);
};

export default App;
