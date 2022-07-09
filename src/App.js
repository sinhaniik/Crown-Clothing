import { useEffect } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { checkUserSession } from './component/store/user/user-action';

const App = () => {
	// UPDATE USER RELEATED DATA
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkUserSession());
	}, []);

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
