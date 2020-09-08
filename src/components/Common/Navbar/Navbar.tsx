import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./Navbar.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
	return (
		<div className={cx('Navbar')}>
			<ul className={cx('Navbar-ItemList')}>
				<li>급식 메뉴</li>
				<li>급식 건의</li>
				<li>커뮤니티</li>
			</ul>
		</div>
	);
};

export default Navbar;
