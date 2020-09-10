import React, {
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
	ChangeEvent,
	KeyboardEvent,
	ReactNode,
} from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import CheckBox from 'components/Common/CheckBox';

const style = require('./SignIn.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SignInProps {
	email: string;
	setEmail: Dispatch<SetStateAction<string>>;

	password: string;
	setPassword: Dispatch<SetStateAction<string>>;

	requestSignIn: () => Promise<void>;
	children?: ReactNode;
}

const SignIn = ({
	email,
	setEmail,
	password,
	setPassword,
	requestSignIn,
	children,
}: SignInProps) => {
	const [checked, setChecked] = useState<boolean>(false);

	const onKeyEnter = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.keyCode === 13) {
				e.preventDefault();
				requestSignIn();
			}
		},
		[requestSignIn]
	);

	return (
		<div className={cx('SignIn')}>
			<div className={cx('SignIn-Title')}>환영합니다!</div>
			<div className={cx('SignIn-Input')}>
				<div className={cx('SignIn-Input-Item')}>
					<p>이메일</p>
					<input
						type="email"
						required
						value={email}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
						onKeyDown={onKeyEnter}
					/>
				</div>

				<div className={cx('SignIn-Input-Item')}>
					<p>비밀번호</p>
					<input
						type="password"
						required
						value={password}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
						onKeyDown={onKeyEnter}
					/>
				</div>
			</div>

			<div className={cx('SignIn-ButtonZone')}>
				<button onClick={requestSignIn}>Sign In</button>
			</div>

			{children && children}
		</div>
	);
};

export default SignIn;
