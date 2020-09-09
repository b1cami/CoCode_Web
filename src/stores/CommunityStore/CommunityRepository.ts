import axios, { AxiosResponse } from 'axios';
import { SERVER } from 'config/config.json';
import { IPostWriteTypes, IPostCommentTypes } from 'interface/PostTypes';
import SecureLS from 'secure-ls';

class CommunityRepository {
	handlePostList = async (page: number) => {
		const { data }: AxiosResponse = await axios.get(
			`${SERVER}/post/getPosts/${page}`
		);
		return data;
	};

	handlePostWrite = async (request: IPostWriteTypes) => {
		const ls = new SecureLS({ encodingType: 'aes' });

		const { data }: AxiosResponse = await axios.post(
			`${SERVER}/post/upload`,
			request,
			{
				headers: {
					Token: ls.get('cocode-token'),
				},
			}
		);
		return data;
	};

	handlePostDelete = async (idx: number) => {
		const { data }: AxiosResponse = await axios.delete(
			`${SERVER}/post/delete/${idx}`
		);
		return data;
	};

	handleCommentList = async (id: number) => {
		const { data }: AxiosResponse = await axios.get(
			`${SERVER}/post/getComments/${id}`
		);
		return data;
	};

	handleCommentDelete = async (id: number) => {
		const { data }: AxiosResponse = await axios.delete(
			`${SERVER}/post/deleteComment/${id}`
		);
		return data;
	};

	handleCommentWrite = async (request: IPostCommentTypes) => {
		const ls = new SecureLS({ encodingType: 'aes' });
		const { data }: AxiosResponse = await axios.post(
			`${SERVER}/post/comment`,
			request,
			{
				headers: {
					Token: ls.get('cocode-token'),
				},
			}
		);
		return data;
	};
}

export default new CommunityRepository();
