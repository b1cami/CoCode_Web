import React, { useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import MyInfoContainer from 'containers/MyInfo';

const style = require('./Header.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HeaderProps {}

const Header = () => {
	const [isModal, setIsModal] = useState<boolean>(false);

	const imageStyle: Object = {
		width: '50px',
		height: '50px',
		borderRadius: '50%',
		cursor: 'pointer',
	};

	return (
		<div className={cx('Header')}>
			<div className={cx('Header-Contents')}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<img src="/icon/Logo.png" alt="cocode-Logo" style={imageStyle} />
					<div style={{ fontSize: '25px', fontWeight: 'bold' }}>CoCode</div>
				</div>

				<div>
					<img
						src="/images/PROFILE_DEFAULT.jpg"
						alt="profile"
						style={imageStyle}
						onClick={() => setIsModal(true)}
					/>
				</div>
			</div>
			{isModal && <MyInfoContainer setIsModal={() => setIsModal(false)} />}
		</div>
	);
};

export default Header;
