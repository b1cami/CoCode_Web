import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	KeyboardEvent,
} from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import Community from 'components/Community';
import Loading from 'components/Common/Loading';
import { simpleAlert } from 'lib/SweetAlert';
import { IPostCommentReadTypes } from 'interface/PostTypes';
import CommunityModal from 'components/Community/CommunityModal';

const CommunityContainer = observer(({}) => {
	const { store } = useStores();
	const {
		handlePostList,
		postList,
		handlePageCount,
		handlePostDelete,
		handleCommentList,
		handleCommentWrite,
		handleCommentDelete,
	} = store.CommunityStore;

	const postRef = useRef<HTMLDivElement | null>(null);

	const [selectPost, setSelectPost] = useState<any>({});
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [comment, setComment] = useState<string>('');
	const [commentList, setCommentList] = useState<IPostCommentReadTypes[]>([]);

	const requestPostList = useCallback(async () => {
		try {
			await handlePostList();
			setIsLoading(false);
		} catch (error) {
			throw error;
		}
	}, [handlePostList]);

	const requestPostDelete = useCallback(
		async (idx: number) => {
			try {
				const response = await handlePostDelete(idx);

				switch (response.status) {
					case 200:
						simpleAlert('성공', '글 삭제를 성공하였습니다.', 'success');
						setSelectPost({});
						return;
				}
			} catch (error) {
				throw error;
			}
		},
		[handlePostDelete]
	);

	const requestCommentList = useCallback(
		async (id: number) => {
			try {
				const response = await handleCommentList(id);
				console.log(response);
				if (response.status === 200) {
					setCommentList(
						response.comments.sort((a: any, b: any) => {
							return a.upload - b.upload;
						})
					);
				}
			} catch (error) {
				throw error;
			}
		},
		[handleCommentList]
	);

	const requestCommentWrite = useCallback(
		async (e: KeyboardEvent<HTMLInputElement>) => {
			if (e.keyCode === 13) {
				e.preventDefault();

				if (comment.trim() === '') {
					simpleAlert('잠시만요', '입력란을 채워주세요.', 'error');
					return;
				}

				const request: any = {
					comment,
					postId: selectPost.id,
				};

				const response = await handleCommentWrite(request);
				console.log(response);
				if (response.status === 200) {
					setComment('');
					requestCommentList(selectPost.id);
				}
			}
		},
		[comment, handleCommentWrite, simpleAlert]
	);

	const requestCommentDelete = useCallback(
		async (id: number) => {
			try {
				const response = await handleCommentDelete(id);
				if (response.status === 200) {
					simpleAlert('성공', '댓글 삭제를 성공했습니다.', 'success');
					setCommentList(
						commentList.filter(
							(comment: IPostCommentReadTypes) => comment.id !== id
						)
					);
				}
			} catch (error) {
				throw error;
			}
		},
		[handleCommentDelete, requestCommentList, commentList]
	);

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

	const communityModal: JSX.Element = (
		<CommunityModal
			setIsModal={() => setSelectPost({})}
			selectPost={selectPost}
			comment={comment}
			setComment={setComment}
			requestCommentWrite={requestCommentWrite}
			commentList={commentList}
			requestCommentDelete={requestCommentDelete}
		/>
	);

	return (
		<>
			<Community
				postList={postList}
				postRef={postRef}
				requestPostDelete={requestPostDelete}
				requestCommentList={requestCommentList}
				selectPost={selectPost}
				setSelectPost={setSelectPost}
				communityModal={communityModal}
			>
				{isLoading && <Loading />}
			</Community>
		</>
	);
});

export default CommunityContainer;
