import axios, { AxiosResponse } from 'axios';
import { SERVER } from 'config/config.json';
import {
	ISendEmailTypes,
	ISignUpTypes,
	ISignInTypes,
} from 'interface/AuthTypes';

class AuthRepository {
	handleSendEmail = async (request: ISendEmailTypes) => {
		const { data }: AxiosResponse = await axios.post(
			`${SERVER}/users/sendEmail`,
			request
		);
		return data;
	};

	handleSignUp = async (request: ISignUpTypes) => {
		const { data }: AxiosResponse = await axios.post(
			`${SERVER}/users/signUp`,
			request
		);
		return data;
	};

	handleSignIn = async (request: ISignInTypes) => {
		const { data }: AxiosResponse = await axios.post(
			`${SERVER}/users/login`,
			request
		);
		return data;
	};
}

export default new AuthRepository();
