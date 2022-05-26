import SignUpform from '../../component/sign-up-form/sign-up-form.component';
import SignInform from '../../component/sign-in-form/sign-in-form.component';
import { AuthenticationContainer } from './authentication.styles';

const Authentication = () => {
	return (
		<AuthenticationContainer>
			<SignInform />
			<SignUpform />
		</AuthenticationContainer>
	);
};

export default Authentication;
