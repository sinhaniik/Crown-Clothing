import './category-directory.style.scss';
import CategoryItem from '../category-items/category-item.component';

const DirectoryComponent = ({ categories }) => {
	return (
		<div className='categories-container'>
			{categories.map((category) => {
				return <CategoryItem category={category} />;
			})}
		</div>
	);
};

export default DirectoryComponent;
