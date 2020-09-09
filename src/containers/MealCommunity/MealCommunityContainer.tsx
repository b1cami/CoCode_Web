import React, {
	useEffect,
	useCallback,
	useRef,
	useState,
	KeyboardEvent,
} from 'react';
import { observer } from 'mobx-react';
import MealInquiry from 'components/MealInquiry';
import Loading from 'components/Common/Loading';
import MealInquiryModal from 'components/MealInquiry/MealInquiryModal';
import { IPostCommentReadTypes, IPostCommentTypes } from 'interface/PostTypes';
import { simpleAlert } from 'lib/SweetAlert';
import useStores from 'lib/useStores';

const MealCommunityContainer = observer(() => {
	const { store } = useStores();
	const {
		handleMealInquiryList,
		inquiryList,
		handlePageCount,
		handleMealDelete,
		handleMealComment,
		handleMealCommentWrite,
		handleMealCommentDelete,
	} = store.MealStore;

	const inquiryRef = useRef<HTMLDivElement | null>(null);

	const [selectPost, setSelectPost] = useState<any>({});
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [comment, setComment] = useState<string>('');
	const [commentList, setCommentList] = useState<IPostCommentReadTypes[]>([]);

	const requestMealInquiryList = useCallback(async () => {
		try {
			await handleMealInquiryList();
			setIsLoading(false);
		} catch (error) {
			throw error;
		}
	}, [handleMealInquiryList]);

	const requestPostDelete = useCallback(
		async (idx: number) => {
			try {
				const response = await handleMealDelete(idx);

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
		[handleMealDelete]
	);

	const requestCommentList = useCallback(
		async (id: number) => {
			try {
				const response = await handleMealComment(id);
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
		[handleMealComment]
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
					lunchId: selectPost.id,
				};

				const response = await handleMealCommentWrite(request);
				if (response.status === 200) {
					setComment('');
					requestCommentList(selectPost.id);
				}
			}
		},
		[comment, handleMealCommentWrite, simpleAlert]
	);

	const requestCommentDelete = useCallback(
		async (id: number) => {
			try {
				const response = await handleMealCommentDelete(id);
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
		[handleMealCommentDelete, requestCommentList, commentList]
	);

	const infiniteScroll = useCallback(() => {
		if (inquiryRef.current !== null) {
			const { scrollHeight, scrollTop, offsetHeight } = inquiryRef.current;

			if (Math.round(scrollTop + offsetHeight) === scrollHeight) {
				handlePageCount(null);
				requestMealInquiryList();
			}
		}
	}, [requestMealInquiryList, handlePageCount]);

	useEffect(() => {
		requestMealInquiryList();
		window.addEventListener('scroll', infiniteScroll, true);

		return () => {
			window.removeEventListener('scroll', infiniteScroll, true);
			handlePageCount(0);
		};
	}, [requestMealInquiryList, handlePageCount, infiniteScroll]);

	const communityModal: JSX.Element = (
		<MealInquiryModal
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
			<MealInquiry
				inquiryList={inquiryList}
				inquiryRef={inquiryRef}
				requestPostDelete={requestPostDelete}
				requestCommentList={requestCommentList}
				selectPost={selectPost}
				setSelectPost={setSelectPost}
				communityModal={communityModal}
			>
				{isLoading && <Loading />}
			</MealInquiry>
		</>
	);
});

export default MealCommunityContainer;
