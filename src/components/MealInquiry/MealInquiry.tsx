import React, { MutableRefObject, ReactNode, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import timeCounting from 'time-counting';
import SecureLS from 'secure-ls';
import { IMealPostListTypes } from 'interface/MealInquiryTypes';
import { BsTrash } from 'react-icons/bs';
import { confirmAlert } from 'lib/SweetAlert';
import { Palette } from 'styles/Palette/Palette';
import { FaPen } from 'react-icons/fa';
import CommunityWriteContainer from 'containers/MealCommunity/CommunityWrite';

const style = require('./MealInquiry.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface MealInquiryProps {
	inquiryList: IMealPostListTypes[];
	inquiryRef: MutableRefObject<HTMLDivElement | null>;
	requestPostDelete: (id: number) => Promise<void>;
	requestCommentList: (id: number) => Promise<void>;
	selectPost: any;
	setSelectPost: any;
	children?: ReactNode;
	communityModal: JSX.Element;
}

const MealInquiry = ({
	inquiryList,
	inquiryRef,
	requestCommentList,
	requestPostDelete,
	selectPost,
	setSelectPost,
	children,
	communityModal,
}: MealInquiryProps) => {
	const [isModal, setIsModal] = useState<boolean>(false);

	return (
		<div className={cx('MealInquiry')}>
			<div className={cx('MealInquiry-Title')}>급식 건의 게시판</div>
			<div className={cx('MealInquiry-List')} ref={inquiryRef}>
				{inquiryList.length > 0 ? (
					inquiryList.map((post: IMealPostListTypes) => {
						const ls = new SecureLS({ encodingType: 'aes' });
						const myInfo: string = ls.get('userInfo').name;

						if (post) {
							const { description, id, foodName, uploader, upload } = post;
							const diffTime: string = timeCounting(upload, { lang: 'ko' });
							return (
								<div
									key={id}
									className={cx('MealInquiry-List-Item')}
									onClick={() => {
										setSelectPost(post);
										requestCommentList(id);
									}}
								>
									{myInfo === uploader && (
										<BsTrash
											className={cx('MealInquiry-List-Item-Menu')}
											onClick={() => {
												confirmAlert(
													'잠시만요',
													'해당 글을 삭제하시겠습니까?',
													'warning',
													() => requestPostDelete(id)
												);
											}}
										/>
									)}
									<div className={cx('MealInquiry-List-Item-Top')}>
										<img src="/images/PROFILE_DEFAULT.jpg" alt="asdf" />
										<div>
											<div>{uploader}</div>
											<div style={{ color: Palette.boldBlue }}>{diffTime}</div>
										</div>
									</div>
									<div className={cx('MealInquiry-List-Item-Title')}>
										제목:{' '}
										{String(foodName).length > 20
											? String(foodName).substring(0, 20).concat('...')
											: String(foodName)}
									</div>
									<div style={{ whiteSpace: 'pre-wrap' }}>
										{String(description).length >= 100
											? String(description).concat('...')
											: String(description)}
									</div>
								</div>
							);
						}
					})
				) : (
					<div className={cx('MealInquiry-Nolength')}>
						커뮤니티에 등록된 글이 없습니다!
					</div>
				)}
			</div>

			<button
				className={cx('MealInquiry-Write')}
				onClick={() => setIsModal(true)}
			>
				<FaPen />
			</button>

			{isModal && <CommunityWriteContainer setIsModal={setIsModal} />}
			{Object.keys(selectPost).length > 0 && communityModal}
			{children && children}
		</div>
	);
};

export default MealInquiry;
