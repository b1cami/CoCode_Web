import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./Header.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
	return (
		<div className={cx('Header')}>
			<div></div>
		</div>
	);
};

export default Header;
