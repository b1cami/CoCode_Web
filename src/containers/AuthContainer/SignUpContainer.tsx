import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react';
import SignUp from 'components/Auth/SignUp';
import useStores from 'lib/useStores';
import { ISendEmailTypes, ISignUpTypes } from 'interface/AuthTypes';
import Swal from 'sweetalert2';
import { AxiosResponse } from 'axios';
import { simpleAlert } from 'lib/SweetAlert';
import Loading from 'components/Common/Loading';

interface ISignUpContainerProps {
	setPageType: Dispatch<SetStateAction<string>>;
}

const SignUpContainer = observer(({ setPageType }: ISignUpContainerProps) => {
	const { store } = useStores();
	const { handleSendEmail, handleSignUp } = store.AuthStore;

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>('');

	const [isCompleted, setIsCompleted] = useState<boolean>(false);
	const [certifyCode, setCertifyCode] = useState<string>('');

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const requestSendEmail = useCallback(async () => {
		try {
			setIsLoading(true);
			const request: ISendEmailTypes = {
				email,
				password,
				name,
			};

			if (email.trim() === '' || password.trim() === '' || name.trim() === '') {
				Swal.fire('잠시만요', '값을 모두 입력해주세요', 'error');
				return;
			}

			const response: AxiosResponse = await handleSendEmail(request);
			console.log(response);

			setIsLoading(false);
			switch (response.status) {
				case 200:
					setIsCompleted(true);
					simpleAlert('성공', '이메일을 발송했습니다.', 'success');
					return;

				case 400:
					simpleAlert('잠시만요', '이미 존재하는 유저입니다.', 'warning');
					return;

				case 500:
					simpleAlert('잠시만요', '서버 오류입니다.', 'error');
					return;
			}
		} catch (error) {
			throw error;
		}
	}, [email, password, name, handleSendEmail]);

	const requestSignUp = useCallback(async () => {
		try {
			setIsLoading(true);
			const request: ISignUpTypes = {
				email,
				certifyCode,
			};

			const response = await handleSignUp(request);
			console.log(response);

			setIsLoading(false);
			switch (response.status) {
				case 200:
					simpleAlert('성공', '회원가입에 성공하였습니다.', 'success');
					setPageType('sign');
					return;

				case 401:
					simpleAlert('잠시만요', '인증코드가 올바르지 않습니다.', 'error');
					return;

				case 500:
					simpleAlert('오류', '서버 오류입니다.', 'error');
					return;
			}
		} catch (error) {
			console.log(error);
			throw error;
		}
	}, [email, certifyCode, handleSignUp]);

	return (
		<SignUp
			name={name}
			setName={setName}
			email={email}
			setEmail={setEmail}
			password={password}
			setPassword={setPassword}
			requestSendEmail={requestSendEmail}
			isCompleted={isCompleted}
			requestSignUp={requestSignUp}
			certifyCode={certifyCode}
			setCertifyCode={setCertifyCode}
		>
			{isLoading && <Loading />}
		</SignUp>
	);
});

export default SignUpContainer;
