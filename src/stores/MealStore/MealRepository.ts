import axios, { AxiosResponse } from 'axios';
import { SERVER } from 'config/config.json';
import { IMealPostTypes } from 'interface/MealInquiryTypes';
import SecureLS from 'secure-ls';

class MealRepository {
	handleMealList = async () => {
		const { data }: AxiosResponse = await axios.get(
			`${SERVER}/lunch/getSchoolLunch`
		);
		return data;
	};

	handleMealInquiryList = async (page: number) => {
		const { data }: AxiosResponse = await axios.get(
			`${SERVER}/lunch/getLunches/${page}`
		);
		return data;
	};

	handleMealUpload = async (request: IMealPostTypes) => {
		const { data }: AxiosResponse = await axios.post(
			`${SERVER}/lunch/upload`,
			request,
			{
				headers: {
					Token: new SecureLS({ encodingType: 'aes' }).get('cocode-token'),
				},
			}
		);
		return data;
	};

	handleMealDelete = async (id: number) => {
		const { data }: AxiosResponse = await axios.delete(
			`${SERVER}/lunch/delete/${id}`
		);
		return data;
	};

	handleMealComment = async (id: number) => {
		const { data }: AxiosResponse = await axios.get(
			`${SERVER}/lunch/getComments/${id}`
		);
		return data;
	};

	handleMealCommentWrite = async (request: IMealPostTypes) => {
		const { data }: AxiosResponse = await axios.post(
			`${SERVER}/lunch/comment`,
			request,
			{
				headers: {
					Token: new SecureLS({ encodingType: 'aes' }).get('cocode-token'),
				},
			}
		);
		return data;
	};

	handleMealCommentDelete = async (id: number) => {
		const { data }: AxiosResponse = await axios.delete(
			`${SERVER}/lunch/deleteComment/${id}`
		);
		return data;
	};

	// 	/getLunch/{lunchId}
	// /upload
	// /getLunches/{getCount}
	// /getSchoolLunch
	// /delete/{lunchId}
	// /comment
	// /getComments/{lunchId}
	// /deleteComment/{commentId}
}

export default new MealRepository();
