import DirectoryComponent from './component/directory-component/category-directory.component';

const App = () => {
	const categories = [
		{
			id: 1,
			title: 'HATS',
			imageUrl: 'https://i.ibb.co/cvpntL1/hats.png'
		},
		{
			id: 2,
			title: 'JACKETS',
			imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png'
		},
		{
			id: 3,
			title: 'SNEAKERS',
			imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png'
		},
		{
			id: 4,
			title: 'WOMENS',
			imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png'
		},
		{
			id: 5,
			title: 'MENS',
			imageUrl: 'https://i.ibb.co/R70vBrQ/men.png'
		}
	];
	return <DirectoryComponent categories={categories} />;
};

export default App;
