import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';
import CommunityRepository from './CommunityRepository';
import {
	IPostListTypes,
	IPostWriteTypes,
	IPostCommentTypes,
} from 'interface/PostTypes';

@autobind
class CommunityStore {
	@observable pageCount = 0;
	@observable postList: IPostListTypes[] = [];

	@action
	handlePostList = async () => {
		const response = await CommunityRepository.handlePostList(this.pageCount);

		if (this.pageCount === 0) {
			this.postList = response.posts;
		} else if (this.pageCount !== 0) {
			this.postList = [...this.postList, response.posts];
		}

		return response;
	};

	@action
	handlePostWrite = async (request: IPostWriteTypes) => {
		const response = await CommunityRepository.handlePostWrite(request);
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
	handlePostDelete = async (idx: number) => {
		const response = await CommunityRepository.handlePostDelete(idx);

		this.postList = this.postList.filter(
			(post: IPostListTypes) => post.id !== idx
		);
		return response;
	};

	@action
	handleCommentList = async (id: number) => {
		const response = await CommunityRepository.handleCommentList(id);
		return response;
	};

	@action
	handleCommentWrite = async (request: IPostCommentTypes) => {
		const response = await CommunityRepository.handleCommentWrite(request);
		return response;
	};

	@action
	handleCommentDelete = async (id: number) => {
		const response = await CommunityRepository.handleCommentDelete(id);
		return response;
	};
}

export default CommunityStore;
