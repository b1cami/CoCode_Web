import { action } from 'mobx';
import { autobind } from 'core-decorators';
import AuthRepository from './AuthRepository';
import {
	ISendEmailTypes,
	ISignUpTypes,
	ISignInTypes,
} from 'interface/AuthTypes';
import { AxiosResponse } from 'axios';

@autobind
class AuthStore {
	@action
	handleSendEmail = async (request: ISendEmailTypes) => {
		const response: AxiosResponse = await AuthRepository.handleSendEmail(
			request
		);
		return response;
	};

	@action
	handleSignUp = async (request: ISignUpTypes) => {
		const response: AxiosResponse = await AuthRepository.handleSignUp(request);
		return response;
	};

	@action
	handleSignIn = async (request: ISignInTypes) => {
		const response: AxiosResponse = await AuthRepository.handleSignIn(request);
		return response;
	};
}

export default AuthStore;
