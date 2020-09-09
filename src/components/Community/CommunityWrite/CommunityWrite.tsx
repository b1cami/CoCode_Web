import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { MdClose } from 'react-icons/md';
import { Table } from 'react-bootstrap';

const style = require('./CommunityWrite.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommunityWriteProps {
	setIsModal: Dispatch<SetStateAction<boolean>>;
	title: string;
	setTitle: Dispatch<SetStateAction<string>>;
	content: string;
	setContent: Dispatch<SetStateAction<string>>;
	requestPostWrite: () => Promise<void>;
}

const CommunityWrite = ({
	setIsModal,
	title,
	setTitle,
	content,
	setContent,
	requestPostWrite,
}: CommunityWriteProps) => {
	return (
		<>
			<div
				className={cx('CommunityWrite-Wrapper')}
				onClick={() => setIsModal(false)}
			></div>
			<div className={cx('CommunityWrite')}>
				<div className={cx('CommunityWrite-Top')}>
					<div className={cx('CommunityWrite-Top-Title')}>커뮤니티 글 작성</div>
					<MdClose
						style={{ fontSize: '24px' }}
						onClick={() => setIsModal(false)}
					/>
				</div>

				<Table className={cx('CommunityWrite-Form')}>
					<tbody>
						<tr className={cx('CommunityWrite-Form-Name')}>
							<td className={cx('CommunityWrite-Form-Name-Title')}>제목: </td>
							<td>
								<input
									type="text"
									placeholder="제목을 입력하세요."
									value={title}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setTitle(e.target.value)
									}
									className={cx('CommunityWrite-Form-Name-TitleInput')}
								/>
							</td>
						</tr>

						<tr className={cx('CommunityWrite-Form-Contents')}>
							<td className={cx('CommunityWrite-Form-Contents-Title')}>
								내용{' '}
							</td>
							<td>
								<textarea
									placeholder="내용을 입력하세요."
									value={content}
									onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
										setContent(e.target.value)
									}
									className={cx('CommunityWrite-Form-Contents-TitleInput')}
								></textarea>
							</td>
						</tr>
					</tbody>
				</Table>
				<div className={cx('CommunityWrite-Button')}>
					<button onClick={requestPostWrite}>글 작성</button>
				</div>
			</div>
		</>
	);
};

export default CommunityWrite;
