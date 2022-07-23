import { CardElement } from '@stripe/react-stripe-js';
import { useStripe, useElement } from '@stripe/react-stripe-js';

import { PaymentFormContainer, ContainerForm } from './payment-form.styles';

import Button, { BUTTON_TYPE_CLASS } from '../buttton/button.component';

const PaymentForm = () => {
	const stripe = useStripe();
	const elements = useElement();

	const paymentHandler = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}
	};

	return (
		<PaymentFormContainer>
			<h2>Credit Card Payment: </h2>
			<ContainerForm>
				<CardElement />
				<Button buttonType={BUTTON_TYPE_CLASS.inverted}> pay now </Button>
			</ContainerForm>
		</PaymentFormContainer>
	);
};

export default PaymentForm;
