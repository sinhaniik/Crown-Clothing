import SignUpform from '../../component/sign-up-form/sign-up-form.component';
import SignInform from '../../component/sign-in-form/sign-in-form.component';
import './authentication.style.scss';
const Authentication = () => {
	return (
		<div className='authentication-container'>
			<SignInform />
			<SignUpform />
		</div>
	);
};

export default Authentication;
