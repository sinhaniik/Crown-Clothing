import { Fragment, useContext } from 'react';

import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrownLogo } from '../../assests/crown.svg';
import CartIcon from '../../component/cart-icon/cart-icon.component';
import CartDropdown from '../../component/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../context/user.contex';
import { CartContext } from '../../context/cart.context';
import { userSignOut } from '../../utils/firebase/firebase.utils';

//styled-component jsx
import {
	NavigationContainer,
	NavLink,
	NavLinks,
	LogoContainer
} from './navigation.style';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

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
