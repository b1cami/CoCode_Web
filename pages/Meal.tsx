import React from 'react';
import 'styles/Default.scss';
import { Provider } from 'mobx-react';
import stores from 'stores';
import PageTemplate from 'components/Common/PageTemplate';
import MealContainer from 'containers/Meal';

const MealPage = () => {
	return (
		<Provider store={stores}>
			<PageTemplate>
				<MealContainer />
			</PageTemplate>
		</Provider>
	);
};

export default MealPage;
