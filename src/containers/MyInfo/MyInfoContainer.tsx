import React, { useCallback, useEffect, Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import MyInfo from 'components/MyInfo';

interface IMyInfoContainerProps {
	setIsModal: () => void;
}

const MyInfoContainer = observer(({ setIsModal }: IMyInfoContainerProps) => {
	const { store } = useStores();
	const { myInfo, handleMyInfo } = store.MyInfoStore;

	const requestMyInfo = useCallback(async () => {
		try {
			await handleMyInfo();
		} catch (error) {
			throw error;
		}
	}, [handleMyInfo]);

	useEffect(() => {
		requestMyInfo();
	}, [requestMyInfo]);

	return <MyInfo myInfo={myInfo} setIsModal={setIsModal} />;
});

export default MyInfoContainer;
