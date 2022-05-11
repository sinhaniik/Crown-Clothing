import { Fragment, useContext } from 'react';

import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrownLogo } from '../../assests/crown.svg';
import CartIcon from '../../component/cart-icon/cart-icon.component';
import CartDropdown from '../../component/cart-dropdown/cart-dropdown.component';

import './navigation.style.scss';
import { UserContext } from '../../context/user.contex';
import { CartContext } from '../../context/cart.context';
import { userSignOut } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	return (
		<Fragment>
			<div className='navigation'>
				<Link className='logo-container' to='/'>
					<CrownLogo className='nav-logo' />
				</Link>

				<div className='nav-links-container'>
					<Link className='nav-link' to='/shop'>
						SHOP
					</Link>

					{currentUser ? (
						<span className='nav-link' onClick={userSignOut}>
							SIGN OUT
						</span>
					) : (
						<Link className='nav-link' to='/auth'>
							SIGN IN
						</Link>
					)}

					<CartIcon />
				</div>
				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
