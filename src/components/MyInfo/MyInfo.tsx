import React, { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import IUserTypes from 'interface/UserTypes';
import { MdClose } from 'react-icons/md';

const style = require('./MyInfo.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface MyInfoProps {
	myInfo: IUserTypes;
	setIsModal: () => void;
}

const MyInfo = ({ myInfo, setIsModal }: MyInfoProps) => {
	const { name, email } = myInfo;
	return (
		<>
			<div className={cx('MyInfo-Wrapper')} onClick={setIsModal}></div>
			<div className={cx('MyInfo')}>
				<div className={cx('MyInfo-Top')}>
					<div className={cx('MyInfo-Top-Title')}>내 정보</div>
					<MdClose
						style={{ fontSize: '24px', cursor: 'pointer' }}
						onClick={setIsModal}
					/>
				</div>

				<div className={cx('MyInfo-Contents')}>
					<img
						src="/images/PROFILE_DEFAULT.jpg"
						alt="default profile"
						style={{ width: 100, height: 100 }}
					/>
					<div>이름: {name}</div>
					<div>이메일: {email}</div>
				</div>
			</div>
		</>
	);
};

export default MyInfo;
