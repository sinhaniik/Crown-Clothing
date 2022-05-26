import { Route, useNavigate } from 'react-router-dom';
import DirectoryItem from '../directory-items/directory-items.component';

import { CategoriesContainer } from './category-directory.style.jsx';

const categories = [
	{
		id: 1,
		title: 'HATS',
		imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
		route: 'shop/hats'
	},
	{
		id: 2,
		title: 'JACKETS',
		imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
		route: 'shop/jackets'
	},
	{
		id: 3,
		title: 'SNEAKERS',
		imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
		route: 'shop/sneakers'
	},
	{
		id: 4,
		title: 'WOMENS',
		imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
		route: 'shop/womens'
	},
	{
		id: 5,
		title: 'MENS',
		imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
		route: 'shop/mens'
	}
];

const DirectoryComponent = () => {
	return (
		<CategoriesContainer>
			{categories.map((category) => {
				return <DirectoryItem category={category} />;
			})}
		</CategoriesContainer>
	);
};

export default DirectoryComponent;
