import AuthStore from './AuthStore';
import CommunityStore from './CommunityStore';
import MealStore from './MealStore';
import MyInfoStore from './MyInfoStore';

const stores: Object = {
	AuthStore: new AuthStore(),
	CommunityStore: new CommunityStore(),
	MealStore: new MealStore(),
	MyInfoStore: new MyInfoStore(),
};

export default stores;
