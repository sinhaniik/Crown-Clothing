import DirectoryItem from '../directory-items/directory-items.component';
import styled from 'styled-components';
import { CategoriesContainer } from './category-directory.style.jsx';

const DirectoryComponent = ({ categories }) => {
	return (
		<CategoriesContainer>
			{categories.map((category) => {
				return <DirectoryItem category={category} />;
			})}
		</CategoriesContainer>
	);
};

export default DirectoryComponent;
