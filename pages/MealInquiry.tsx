import React from 'react';
import 'styles/Default.scss';
import { Provider } from 'mobx-react';
import stores from 'stores';
import PageTemplate from 'components/Common/PageTemplate';
import MealCommunityContainer from 'containers/MealCommunity';

const MealPage = () => {
	return (
		<Provider store={stores}>
			<PageTemplate>
				<MealCommunityContainer />
			</PageTemplate>
		</Provider>
	);
};

export default MealPage;
