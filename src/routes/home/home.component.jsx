import { Outlet } from 'react-router-dom';
import DirectoryComponent from '../../component/directory-component/category-directory.component';

const Home = () => {
	return (
		<div>
			<DirectoryComponent />;
			<Outlet />
		</div>
	);
};

export default Home;
