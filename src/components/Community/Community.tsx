import React, { MutableRefObject, useState, ReactNode } from 'react';
import classNames from 'classnames';
import { IPostListTypes } from 'interface/PostTypes';
import { ClassNamesFn } from 'classnames/types';
import { FaPen } from 'react-icons/fa';
import CommunityWriteContainer from 'containers/Community/CommunityWrite';

const style = require('./Community.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommunityProps {
	postList: IPostListTypes[];
	postRef: MutableRefObject<HTMLDivElement | null>;
	children?: ReactNode;
}

// const imgSrc = require('../../assets/icon/Logo.png');

const Community = ({ postList, postRef, children }: CommunityProps) => {
	const [isModal, setIsModal] = useState<boolean>(false);
	// const [selectPost, setSelectPost] = useState<Object>({});

	return (
		<div className={cx('Community')}>
			<div className={cx('Community-Title')}>커뮤니티 사이트</div>
			<div className={cx('Community-List')} ref={postRef}>
				{postList.map((post: IPostListTypes) => {
					if (post) {
						const { content, id, title, uploader } = post;
						return (
							<div key={id} className={cx('Community-List-Item')}>
								<div className={cx('Community-List-Item-Top')}>
									<img src="/images/PROFILE_DEFAULT.jpg" alt="asdf" />
									<div>{uploader}</div>
								</div>
								<div className={cx('Community-List-Item-Title')}>
									제목:{' '}
									{String(title).length > 20
										? String(title).substring(0, 20).concat('...')
										: String(title)}
								</div>
								<div>
									{String(content).length >= 100
										? String(content).concat('...')
										: String(content)}
								</div>
							</div>
						);
					}
				})}
			</div>

			<button
				className={cx('Community-Write')}
				onClick={() => setIsModal(true)}
			>
				<FaPen />
			</button>

			{isModal && <CommunityWriteContainer setIsModal={setIsModal} />}
			{children && children}
		</div>
	);
};

export default Community;
