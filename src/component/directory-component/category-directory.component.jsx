import './category-directory.style.scss';
import DirectoryItem from '../directory-items/directory-items.component';

const DirectoryComponent = ({ categories }) => {
	return (
		<div className='categories-container'>
			{categories.map((category) => {
				return <DirectoryItem category={category} />;
			})}
		</div>
	);
};

export default DirectoryComponent;
