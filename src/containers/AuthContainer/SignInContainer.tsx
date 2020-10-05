import React, { useState, useCallback } from 'react';
import { observer } from 'mobx-react';
import SignIn from 'components/Auth/SignIn';
import useStores from 'lib/useStores';
import { ISignInTypes } from 'interface/AuthTypes';
import Loading from 'components/Common/Loading';
import { simpleAlert } from 'lib/SweetAlert';
import SecureLs from 'secure-ls';
import { useRouter, NextRouter } from 'next/router';

const SignInContainer = observer(() => {
	const router: NextRouter = useRouter();
	const { store } = useStores();
	const { handleSignIn } = store.AuthStore;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const requestSignIn = useCallback(async () => {
		const ls = new SecureLs({ encodingType: 'aes' });
		const regExp: RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

		try {
			const request: ISignInTypes = {
				email,
				password,
			};

			if (!regExp.test(email)) {
				simpleAlert('잠시만요', '이메일이 올바르지 않습니다.', 'error');
				return;
			}

			if (!email.trim() || !password.trim()) {
				simpleAlert('잠시만요', '값을 모두 입력해주세요.', 'error');
				return;
			}

			setIsLoading(true);
			const response = await handleSignIn(request);
			setIsLoading(false);
			switch (response.status) {
				case 200:
					ls.set('cocode-token', response.token);
					ls.set('userInfo', response.user);
					simpleAlert('성공', '로그인에 성공하였습니다.', 'success');
					router.push('/Meal');
					return;

				case 400:
					simpleAlert('잠시만요', '이메일이 틀립니다.', 'error');
					return;

				case 401:
					simpleAlert('잠시만요', '비밀번호가 틀립니다.', 'error');
					return;

				case 500:
					simpleAlert('오류', '서버 오류입니다.', 'error');
					return;

				default:
					simpleAlert('오류', '에러가 발생하였습니다.', 'error');
					return;
			}
		} catch (error) {
			throw error;
		}
	}, [email, password, handleSignIn, router]);

	return (
		<SignIn
			email={email}
			setEmail={setEmail}
			password={password}
			setPassword={setPassword}
			requestSignIn={requestSignIn}
		>
			{isLoading && <Loading />}
		</SignIn>
	);
});

export default SignInContainer;
