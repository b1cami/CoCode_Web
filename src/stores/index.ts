import AuthStore from './AuthStore';
import CommunityStore from './CommunityStore';
import MealStore from './MealStore';

const stores: Object = {
	AuthStore: new AuthStore(),
	CommunityStore: new CommunityStore(),
	MealStore: new MealStore(),
};

export default stores;
