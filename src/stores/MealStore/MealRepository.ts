import axios, { AxiosResponse } from 'axios';
import { SERVER } from 'config/config.json';

class MealRepository {
	handleMealList = async () => {
		const { data }: AxiosResponse = await axios.get(
			`${SERVER}/lunch/getSchoolLunch`
		);
		return data;
	};
}

export default new MealRepository();
