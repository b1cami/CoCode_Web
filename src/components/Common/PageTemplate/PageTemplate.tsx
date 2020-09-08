import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Navbar from '../Navbar';
import Header from '../Header';

const style = require('./PageTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface IPageTemplateProps {
	children?: ReactNode;
}

const PageTemplate = ({ children }: IPageTemplateProps) => {
	return (
		<div className={cx('PageTemplate')}>
			<div className={cx('PageTemplate-HeaderBottom')}>
				<Navbar />
				<div className={cx('PageTemplate-Contents')}>
					{children && children}
				</div>
			</div>
			{/* <Footer /> */}
		</div>
	);
};

export default PageTemplate;
