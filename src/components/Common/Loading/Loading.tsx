import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Spinner } from '@class101/ui';
import { Palette } from 'styles/Palette/Palette';

const style = require('./Loading.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Loading = () => {
	return (
		<div className={cx('Loading')}>
			<Spinner size={100} backgroundColor={Palette.primary} />
		</div>
	);
};

export default Loading;
