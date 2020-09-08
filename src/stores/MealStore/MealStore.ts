import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';
import MealRepository from './MealRepository';

@autobind
class MealStore {
	@observable breakfastList: string[] = [];
	@observable lunchList: string[] = [];
	@observable dinnerList: string[] = [];

	@action
	handleMealList = async () => {
		const response = await MealRepository.handleMealList();
		this.breakfastList = response.breakfast;
		this.lunchList = response.lunch;
		this.dinnerList = response.dinner;
		return response;
	};
}

export default MealStore;
