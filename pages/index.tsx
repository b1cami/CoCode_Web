import React from 'react';
import 'styles/Default.scss';
import { Provider } from 'mobx-react';
import stores from 'stores';
import CommunityContainer from 'containers/Community';
import SignTemplate from 'components/Auth/SignTemplate';
import PageTemplate from 'components/Common/PageTemplate/PageTemplate';

const IndexPage = () => {
	return (
		<Provider store={stores}>
			{/* {pathname === 'post' && <CommunityContainer />}
			 */}
			<PageTemplate>
				<CommunityContainer />
			</PageTemplate>
			{/* <SignTemplate /> */}
		</Provider>
	);
};

export default IndexPage;
