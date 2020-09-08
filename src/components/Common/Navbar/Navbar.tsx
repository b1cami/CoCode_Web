import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { FaSchool } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { MdPeople } from 'react-icons/md';
import { GiKnifeFork } from 'react-icons/gi';
import { withRouter } from 'next/router';

const style = require('./Navbar.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NavbarProps {
	router?: any;
}

const Navbar = ({ router }: NavbarProps) => {
	return (
		<div className={cx('Navbar')}>
			<div className={cx('Navbar-ItemList')}>
				<div
					className={cx('Navbar-ItemList-Item', {
						'Navbar-ItemList-Item-Active': router.pathname === 'meal',
					})}
				>
					<GiKnifeFork />
					<div>오늘의 급식</div>
				</div>

				<div
					className={cx('Navbar-ItemList-Item', {
						'Navbar-ItemList-Item-Active': router.pathname === 'meal',
					})}
				>
					<IoIosSend />
					<div>급식 건의</div>
				</div>

				<div
					className={cx('Navbar-ItemList-Item', {
						'Navbar-ItemList-Item-Active': router.pathname === '/',
					})}
				>
					<MdPeople />
					<div>커뮤니티</div>
				</div>

				<div
					className={cx('Navbar-ItemList-Item', {
						'Navbar-ItemList-Item-Active': router.pathname === 'meal',
					})}
				>
					<FaSchool />
					<div>학교 건의</div>
				</div>

				<div
					className={cx('Navbar-ItemList-Item', {
						'Navbar-ItemList-Item-Active': router.pathname === 'meal',
					})}
				>
					<FaSchool />
					<div>학교 건의</div>
				</div>

				<div
					className={cx('Navbar-ItemList-Item', {
						'Navbar-ItemList-Item-Active': router.pathname === 'meal',
					})}
				>
					<FaSchool />
					<div>학교 건의</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Navbar);
