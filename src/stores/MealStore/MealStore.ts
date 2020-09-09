import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';
import MealRepository from './MealRepository';
import { IMealPostTypes, IMealPostListTypes } from 'interface/MealInquiryTypes';

@autobind
class MealStore {
	@observable pageCount: number = 0;
	@observable inquiryList: IMealPostListTypes[] = [];

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

	@action
	handleMealComment = async (id: number) => {
		const response = await MealRepository.handleMealComment(id);
		return response;
	};

	@action
	handleMealInquiryList = async () => {
		const response = await MealRepository.handleMealInquiryList(this.pageCount);

		if (this.pageCount === 0) {
			this.inquiryList = response.lunches;
		} else if (this.pageCount !== 0) {
			this.inquiryList = [...this.inquiryList, response.lunches];
		}

		return response;
	};

	@action
	handlePostWrite = async (request: IMealPostTypes) => {
		const response = await MealRepository.handleMealUpload(request);
		return response;
	};

	@action
	handlePageCount = async (page: number | null) => {
		if (page === null) {
			this.pageCount = this.pageCount + 1;
		} else {
			this.pageCount = page;
		}
	};

	@action
	handleMealDelete = async (idx: number) => {
		const response = await MealRepository.handleMealDelete(idx);

		this.inquiryList = this.inquiryList.filter(
			(post: IMealPostListTypes) => post.id !== idx
		);
		return response;
	};

	@action
	handleMealCommentWrite = async (request: IMealPostTypes) => {
		const response = await MealRepository.handleMealCommentWrite(request);
		return response;
	};

	@action
	handleMealCommentDelete = async (id: number) => {
		const response = await MealRepository.handleMealCommentDelete(id);
		return response;
	};
}

export default MealStore;
