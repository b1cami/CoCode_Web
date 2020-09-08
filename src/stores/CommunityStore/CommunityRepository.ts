import axios, { AxiosResponse } from 'axios';
import { SERVER } from 'config/config.json';
import { IPostWriteTypes } from 'interface/PostTypes';
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
}

export default new CommunityRepository();
