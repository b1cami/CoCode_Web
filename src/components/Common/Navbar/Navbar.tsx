import React, { useCallback } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { FaSchool } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { MdPeople } from 'react-icons/md';
import { GiKnifeFork } from 'react-icons/gi';
import { BiLogOut } from 'react-icons/bi';
import { withRouter } from 'next/router';
import SecureLS from 'secure-ls';
import { simpleAlert } from 'lib/SweetAlert';

const style = require('./Navbar.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NavbarProps {
	router?: any;
}

const Navbar = ({ router }: NavbarProps) => {
	const iconStyle: Object = {
		fontSize: 25,
	};

	const onLogOut = useCallback(() => {
		const ls = new SecureLS({ encodingType: 'aes' });
		ls.clear();
		localStorage.clear();
		router.push('/');
		simpleAlert('성공', '로그아웃 되었습니다.', 'success');
	}, []);

	return (
		<div className={cx('Navbar')}>
			<div className={cx('Navbar-ItemList')}>
				<div
					className={cx('Navbar-ItemList-Item', {
						'Navbar-ItemList-Item-Active': router.pathname === '/Meal',
					})}
					onClick={() => router.push('/Meal')}
				>
					<GiKnifeFork style={iconStyle} />
					<div>오늘의 급식</div>
				</div>

				<div
					className={cx('Navbar-ItemList-Item', {
						'Navbar-ItemList-Item-Active': router.pathname === '/MealInquiry',
					})}
					onClick={() => router.push('/MealInquiry')}
				>
					<IoIosSend style={iconStyle} />
					<div>급식 건의</div>
				</div>

				<div
					className={cx('Navbar-ItemList-Item', {
						'Navbar-ItemList-Item-Active': router.pathname === '/Post',
					})}
					onClick={() => router.push('/Post')}
				>
					<MdPeople style={iconStyle} />
					<div>커뮤니티</div>
				</div>

				<div className={cx('Navbar-ItemList-Item')} onClick={onLogOut}>
					<BiLogOut style={iconStyle} />
					<div>로그아웃</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Navbar);
