import React, {
	Dispatch,
	SetStateAction,
	ChangeEvent,
	KeyboardEvent,
} from 'react';
import classNames from 'classnames';
import timeCounting from 'time-counting';
import { ClassNamesFn } from 'classnames/types';
import { MdClose } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import { IPostCommentReadTypes } from 'interface/PostTypes';
import SecureLS from 'secure-ls';

const style = require('./MealInquiryModal.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface MealInquiryModalProps {
	setIsModal: Dispatch<SetStateAction<Object>>;
	selectPost: any;
	comment: string;
	setComment: Dispatch<SetStateAction<string>>;
	requestCommentWrite: (e: KeyboardEvent<HTMLInputElement>) => Promise<void>;
	commentList: IPostCommentReadTypes[];
	requestCommentDelete: (id: number) => Promise<void>;
}

const MealInquiryModal = ({
	setIsModal,
	selectPost,
	comment,
	setComment,
	requestCommentWrite,
	commentList,
	requestCommentDelete,
}: MealInquiryModalProps) => {
	const { description, id, foodName, upload, uploader } = selectPost;
	const diffTime: string = timeCounting(upload, { lang: 'ko' });

	return (
		<>
			<div
				className={cx('MealInquiryModal-Wrapper')}
				onClick={() => setIsModal({})}
			></div>
			<div className={cx('MealInquiryModal')}>
				<div className={cx('MealInquiryModal-Top')}>
					<div className={cx('MealInquiryModal-Top-Title')}>
						제목: {foodName}
					</div>
					<MdClose
						style={{ fontSize: '24px', cursor: 'pointer' }}
						onClick={() => setIsModal({})}
					/>
				</div>

				<div className={cx('MealInquiryModal-Contents')} key={id}>
					<div className={cx('MealInquiryModal-Contents-Top')}>
						<div className={cx('MealInquiryModal-Contents-Top-Time')}>
							{diffTime}
						</div>
						<div>작성자: {uploader}</div>
					</div>
					<div>{description}</div>
				</div>

				<div className={cx('MealInquiryModal-Comments')}>
					<h5>댓글을 입력해보세요</h5>
					<input
						className={cx('MealInquiryModal-Comments-Input')}
						type="text"
						placeholder="댓글을 입력하세요"
						value={comment}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setComment(e.target.value)
						}
						onKeyDown={requestCommentWrite}
					/>
					<div className={cx('MealInquiryModal-Comments-Title')}>
						{commentList.length}개의 댓글
					</div>
					{commentList.map((comments: IPostCommentReadTypes, index: number) => {
						const { userName, comment, upload } = comments;
						console.log(comments);
						const ls = new SecureLS({ encodingType: 'aes' });
						const myName: string = ls.get('userInfo').name;
						const diffCommentTime: string = timeCounting(upload, {
							lang: 'ko',
						});

						return (
							<div key={index} className={cx('MealInquiryModal-Comments-Top')}>
								<div>
									<div className={cx('MealInquiryModal-Contents-Top-Time')}>
										{diffCommentTime}
									</div>
									<div>{userName}: &nbsp;</div>
									<div className={cx('MealInquiryModal-Comments-Contents')}>
										{comment}
									</div>
								</div>

								<div>
									{myName === userName && (
										<BsTrash
											style={{ cursor: 'pointer' }}
											onClick={() => requestCommentDelete(comments.id)}
										/>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default MealInquiryModal;
