import { Fragment } from 'react';

import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrownLogo } from '../../assests/crown.svg';

import './navigation.style.scss';
const Navigation = () => {
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
				</div>
			</div>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
