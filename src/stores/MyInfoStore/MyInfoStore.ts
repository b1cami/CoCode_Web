import { autobind } from 'core-decorators';
import { observable, action } from 'mobx';
import MyInfoRepository from './MyInfoRepository';
import IUserTypes from 'interface/UserTypes';

@autobind
class MyInfoStore {
	@observable myInfo: IUserTypes = {};

	@action
	handleMyInfo = async () => {
		const response = await MyInfoRepository.handleMyInfo();

		this.myInfo = response.user;
		return response;
	};
}

export default MyInfoStore;
