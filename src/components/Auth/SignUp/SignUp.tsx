import React, { Dispatch, SetStateAction, ChangeEvent, ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./SignUp.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SignUpProps {
	name: string;
	setName: Dispatch<SetStateAction<string>>;
	email: string;
	setEmail: Dispatch<SetStateAction<string>>;
	password: string;
	setPassword: Dispatch<SetStateAction<string>>;
	requestSendEmail: () => Promise<void>;
	isCompleted: boolean;
	certifyCode: string;
	setCertifyCode: Dispatch<SetStateAction<string>>;
	requestSignUp: () => Promise<void>;
	children?: ReactNode;
}

const SignUp = ({
	name,
	setName,
	email,
	setEmail,
	password,
	setPassword,
	requestSendEmail,
	isCompleted,
	certifyCode,
	setCertifyCode,
	requestSignUp,
	children,
}: SignUpProps) => {
	return (
		<div className={cx('SignUp')}>
			<div className={cx('SignUp-Title')}>환영합니다!</div>
			<div className={cx('SignUp-Input')}>
				{!isCompleted ? (
					<>
						<div className={cx('SignUp-Input-Item')}>
							<p>이름</p>
							<input
								type="text"
								required
								value={name}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setName(e.target.value)
								}
							/>
						</div>

						<div className={cx('SignUp-Input-Item')}>
							<p>이메일</p>
							<input
								type="email"
								value={email}
								required
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setEmail(e.target.value)
								}
							/>
						</div>

						<div className={cx('SignUp-Input-Item')}>
							<p>비밀번호</p>
							<input
								type="password"
								required
								value={password}
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									setPassword(e.target.value)
								}
							/>
						</div>
					</>
				) : (
					<div className={cx('SignUp-Input-Item')}>
						<p>이메일 코드를 발송했습니다!</p>
						<input
							type="text"
							value={certifyCode}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setCertifyCode(e.target.value)
							}
						/>
					</div>
				)}
			</div>

			<div className={cx('SignUp-ButtonZone')}>
				{!isCompleted ? (
					<button onClick={requestSendEmail}>다음으로</button>
				) : (
					<button onClick={requestSignUp}>회원가입</button>
				)}
			</div>

			{children && children}
		</div>
	);
};

export default SignUp;
