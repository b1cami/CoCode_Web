import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react';
import useStores from 'lib/useStores';
import { simpleAlert } from 'lib/SweetAlert';
import MealInquiryWrite from 'components/MealInquiry/MealInquiryWrite';

interface ICommunityWriteContainerProps {
	setIsModal: Dispatch<SetStateAction<boolean>>;
}

const CommunityWriteContainer = observer(
	({ setIsModal }: ICommunityWriteContainerProps) => {
		const { store } = useStores();
		const { handlePostWrite } = store.MealStore;

		const [title, setTitle] = useState<string>('');
		const [content, setContent] = useState<string>('');

		const requestPostWrite = useCallback(async () => {
			const request: any = {
				foodName: title,
				description: content,
			};

			if (title.trim() === '' || content.trim() === '') {
				simpleAlert('잠시만요', '값을 모두 입력해주세요.', 'error');
				return;
			}

			const response = await handlePostWrite(request);

			if (response.status === 200) {
				simpleAlert('성공', '글 작성을 성공했습니다.', 'success', () =>
					window.location.reload()
				);
			}
		}, [title, content, handlePostWrite]);

		return (
			<MealInquiryWrite
				setIsModal={setIsModal}
				title={title}
				setTitle={setTitle}
				content={content}
				setContent={setContent}
				requestPostWrite={requestPostWrite}
			/>
		);
	}
);

export default CommunityWriteContainer;
