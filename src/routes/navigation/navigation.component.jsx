import { Fragment } from 'react';

import { Outlet } from 'react-router-dom';

import { ReactComponent as CrownLogo } from '../../assests/crown.svg';
import CartIcon from '../../component/cart-icon/cart-icon.component';
import CartDropdown from '../../component/cart-dropdown/cart-dropdown.component';
import { currentUserSelector } from '../../component/store/user/user.selector';

import { useSelector } from 'react-redux/es/hooks/useSelector';
import { userSignOut } from '../../utils/firebase/firebase.utils';
import { selectIsCartOpen } from '../../component/store/cart/cart.selector';

//styled-component jsx
import {
	NavigationContainer,
	NavLink,
	NavLinks,
	LogoContainer
} from './navigation.style';

const Navigation = () => {
	// to access the redux store's state. This hook takes a selector function as an argument. The selector is called with the store state.
	// whenever state changes react renders

	const currentUser = useSelector(currentUserSelector);

	const isCartOpen = useSelector(selectIsCartOpen);

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrownLogo className='nav-logo' />
				</LogoContainer>

				<NavLinks>
					<NavLink to='/shop'>SHOP</NavLink>

					{currentUser ? (
						<NavLink as={'span'} onClick={userSignOut}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to='/auth'>SIGN IN</NavLink>
					)}

					<CartIcon />
				</NavLinks>

				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
