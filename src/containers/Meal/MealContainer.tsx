import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import Meal from 'components/Meal';
import Loading from 'components/Common/Loading';

const MealContainer = observer(({}) => {
	const { store } = useStores();
	const {
		handleMealList,
		breakfastList,
		lunchList,
		dinnerList,
	} = store.MealStore;

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const requestMealList = useCallback(async () => {
		await handleMealList();
		setIsLoading(false);
	}, [handleMealList]);

	useEffect(() => {
		requestMealList();
	}, [requestMealList]);

	return (
		<Meal
			breakfastList={breakfastList}
			lunchList={lunchList}
			dinnerList={dinnerList}
		>
			{isLoading && <Loading />}
		</Meal>
	);
});

export default MealContainer;
