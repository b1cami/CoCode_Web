import React from 'react';
import 'styles/Default.scss';
import { Provider } from 'mobx-react';
import stores from 'stores';
import PageTemplate from 'components/Common/PageTemplate/PageTemplate';
import CommunityContainer from 'containers/Community';

const PostPage = () => {
	return (
		<Provider store={stores}>
			<PageTemplate>
				<CommunityContainer />
			</PageTemplate>
		</Provider>
	);
};

export default PostPage;
