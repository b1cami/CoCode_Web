import React, { MutableRefObject, useState, ReactNode } from 'react';
import classNames from 'classnames';
import { IPostListTypes } from 'interface/PostTypes';
import { ClassNamesFn } from 'classnames/types';
import { FaPen } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import CommunityWriteContainer from 'containers/Community/CommunityWrite';
import { confirmAlert } from 'lib/SweetAlert';
import SecureLS from 'secure-ls';
import timeCounting from 'time-counting';
import { Palette } from 'styles/Palette/Palette';

const style = require('./Community.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommunityProps {
	postList: IPostListTypes[];
	postRef: MutableRefObject<HTMLDivElement | null>;
	children?: ReactNode;
	requestPostDelete: (idx: number) => Promise<void>;
	requestCommentList: (id: number) => Promise<void>;
	selectPost: any;
	setSelectPost: any;
	communityModal: JSX.Element;
}

const Community = ({
	postList,
	postRef,
	children,
	requestPostDelete,
	requestCommentList,
	selectPost,
	setSelectPost,
	communityModal,
}: CommunityProps) => {
	const [isModal, setIsModal] = useState<boolean>(false);

	return (
		<div className={cx('Community')}>
			<div className={cx('Community-Title')}>커뮤니티 게시판</div>
			<div className={cx('Community-List')} ref={postRef}>
				{postList.length > 0 ? (
					postList.map((post: IPostListTypes) => {
						const ls = new SecureLS({ encodingType: 'aes' });
						const myInfo: string = ls.get('userInfo').name;

						if (post) {
							const { content, id, title, uploader, upload } = post;
							const diffTime: string = timeCounting(upload, { lang: 'ko' });
							return (
								<div
									key={id}
									className={cx('Community-List-Item')}
									onClick={() => {
										setSelectPost(post);
										requestCommentList(id);
									}}
								>
									{myInfo === uploader && (
										<BsTrash
											className={cx('Community-List-Item-Menu')}
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
									<div className={cx('Community-List-Item-Top')}>
										<img src="/images/PROFILE_DEFAULT.jpg" alt="asdf" />
										<div>
											<div>{uploader}</div>
											<div style={{ color: Palette.boldBlue }}>{diffTime}</div>
										</div>
									</div>
									<div className={cx('Community-List-Item-Title')}>
										제목:{' '}
										{String(title).length > 20
											? String(title).substring(0, 20).concat('...')
											: String(title)}
									</div>
									<div style={{ whiteSpace: 'pre-wrap' }}>
										{String(content).length >= 100
											? String(content).concat('...')
											: String(content)}
									</div>
								</div>
							);
						}
					})
				) : (
					<div className={cx('Community-Nolength')}>
						커뮤니티에 등록된 글이 없습니다!
					</div>
				)}
			</div>

			<button
				className={cx('Community-Write')}
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

export default Community;
