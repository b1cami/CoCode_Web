import React, { useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import SignUpContainer from 'containers/AuthContainer/SignUpContainer';
import SignInContainer from 'containers/AuthContainer/SignInContainer';

const style = require('./SignTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

const SignTemplate = () => {
	const [pageType, setPageType] = useState<string>('sign');

	return (
		<div className={cx('SignTemplate')}>
			<div className={cx('SignTemplate-Box')}>
				<div className={cx('SignTemplate-Box-Left')}>
					<div className={cx('SignTemplate-Box-Left-Title')}>
						CoCode에 오신것을
					</div>

					<div className={cx('SignTemplate-Box-Left-Contents')}>
						{pageType === 'sign' ? (
							<>
								<p>ID가 없으시다면 회원가입을 해주세요</p>
								<button onClick={() => setPageType('register')}>
									회원가입
								</button>
							</>
						) : (
							<>
								<p>이미 계정이 있으신가요?</p>
								<button onClick={() => setPageType('sign')}>
									로그인 하러가기
								</button>
							</>
						)}
					</div>
				</div>

				<div className={cx('SignTemplate-Box-Right')}>
					{pageType === 'sign' ? (
						<SignInContainer />
					) : (
						<SignUpContainer setPageType={setPageType} />
					)}
					{/* {pageType === 'sign' ? <SignIn /> : <SignUp />} */}
					{/* <SignUpContainer setPageType={setPageType} /> */}
				</div>
			</div>
		</div>
	);
};

export default SignTemplate;
