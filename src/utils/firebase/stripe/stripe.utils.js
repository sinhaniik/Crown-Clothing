import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
	'pk_test_51LJVfeSHWId63lZTq1uFrGtknGuwSqipL6ksxFgySBcWWd0MnIjgDZLy5BzH0GVPfDynk1AQ012dRXVHslQtuCqU00idPmYFgH'
); // pass the publishable key
