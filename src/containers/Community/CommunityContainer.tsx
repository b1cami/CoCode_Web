import React, { useCallback, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import Community from 'components/Community';
import Loading from 'components/Common/Loading';

const CommunityContainer = observer(({}) => {
	const { store } = useStores();
	const { handlePostList, postList, handlePageCount } = store.CommunityStore;

	const postRef = useRef<HTMLDivElement | null>(null);

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const requestPostList = useCallback(async () => {
		try {
			await handlePostList();
			setIsLoading(false);
		} catch (error) {
			throw error;
		}
	}, [handlePostList]);

	const infiniteScroll = useCallback(() => {
		if (postRef.current !== null) {
			const { scrollHeight, scrollTop, offsetHeight } = postRef.current;

			if (Math.round(scrollTop + offsetHeight) === scrollHeight) {
				handlePageCount(null);
				requestPostList();
			}
		}
	}, [requestPostList, handlePageCount]);

	useEffect(() => {
		requestPostList();
		window.addEventListener('scroll', infiniteScroll, true);

		return () => {
			window.removeEventListener('scroll', infiniteScroll, true);
			handlePageCount(0);
		};
	}, [requestPostList, handlePageCount, infiniteScroll]);

	return (
		<Community postList={postList} postRef={postRef}>
			{isLoading && <Loading />}
		</Community>
	);
});

export default CommunityContainer;
