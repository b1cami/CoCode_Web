import axios, { AxiosResponse } from 'axios';
import { SERVER } from 'config/config.json';
import SecureLS from 'secure-ls';

class MyInfoRepository {
	handleMyInfo = async () => {
		const ls = new SecureLS({ encodingType: 'aes' });
		const { data }: AxiosResponse = await axios.get(`${SERVER}/users/getUser`, {
			headers: {
				Token: ls.get('cocode-token'),
			},
		});
		return data;
	};
}

export default new MyInfoRepository();
