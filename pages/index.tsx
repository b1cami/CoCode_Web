import React from 'react';
import 'styles/Default.scss';
import { Provider } from 'mobx-react';
import stores from 'stores';
import SignTemplate from 'components/Auth/SignTemplate';

const IndexPage = () => {
	return (
		<Provider store={stores}>
			<SignTemplate />
		</Provider>
	);
};

export default IndexPage;
