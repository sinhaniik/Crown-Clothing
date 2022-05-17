import { useContext, Fragment } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../component/product-cards/product-card.component';
import './shop.styles.scss';

const Shop = () => {
	const { categoriesMap } = useContext(CategoriesContext);

	return (
		<Fragment>
			{/* {Object.keys(categoriesMap).map((title) => {
				<Fragment>
					<h2>{title}</h2> */}

			{/* <div className='products-container'>
						{categoriesMap[title].map((product) => {
							return <ProductCard key={product.id} product={product} />;
						})}
					</div> */}
			{/* </Fragment>; */}
			{/* })} */}
		</Fragment>
	);
};

export default Shop;
