import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { MdClose } from 'react-icons/md';
import { Table } from 'react-bootstrap';

const style = require('./MealInquiryWrite.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface MealInquiryWriteProps {
	setIsModal: Dispatch<SetStateAction<boolean>>;
	title: string;
	setTitle: Dispatch<SetStateAction<string>>;
	content: string;
	setContent: Dispatch<SetStateAction<string>>;
	requestPostWrite: () => Promise<void>;
}

const MealInquiryWrite = ({
	setIsModal,
	title,
	setTitle,
	content,
	setContent,
	requestPostWrite,
}: MealInquiryWriteProps) => {
	return (
		<>
			<div
				className={cx('MealInquiryWrite-Wrapper')}
				onClick={() => setIsModal(false)}
			></div>
			<div className={cx('MealInquiryWrite')}>
				<div className={cx('MealInquiryWrite-Top')}>
					<div className={cx('MealInquiryWrite-Top-Title')}>급식 건의 작성</div>
					<MdClose
						style={{ fontSize: '24px' }}
						onClick={() => setIsModal(false)}
					/>
				</div>

				<Table className={cx('MealInquiryWrite-Form')}>
					<tbody>
						<tr className={cx('MealInquiryWrite-Form-Name')}>
							<td className={cx('MealInquiryWrite-Form-Name-Title')}>제목: </td>
							<td>
								<input
									type="text"
									placeholder="제목을 입력하세요."
									value={title}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										setTitle(e.target.value)
									}
									className={cx('MealInquiryWrite-Form-Name-TitleInput')}
								/>
							</td>
						</tr>

						<tr className={cx('MealInquiryWrite-Form-Contents')}>
							<td className={cx('MealInquiryWrite-Form-Contents-Title')}>
								내용{' '}
							</td>
							<td>
								<textarea
									placeholder="내용을 입력하세요."
									value={content}
									onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
										setContent(e.target.value)
									}
									className={cx('MealInquiryWrite-Form-Contents-TitleInput')}
								></textarea>
							</td>
						</tr>
					</tbody>
				</Table>
				<div className={cx('MealInquiryWrite-Button')}>
					<button onClick={requestPostWrite}>글 작성</button>
				</div>
			</div>
		</>
	);
};

export default MealInquiryWrite;
