import './button.style.scss';

const BUTTON_TYPE_CLASS = {
	google: 'google-sign-in',
	facebook: 'google-sign-in',
	imverted: 'inverted'
};

const Button = ({ children, buttonTypes, ...otherProps }) => {
	return (
		<button
			className={`button-container ${BUTTON_TYPE_CLASS[buttonTypes]}`}
			{...otherProps}
		>
			{children}
		</button>
	);
};

export default Button;
