import AuthStore from './AuthStore';
import CommunityStore from './CommunityStore';

const stores: Object = {
	AuthStore: new AuthStore(),
	CommunityStore: new CommunityStore(),
};

export default stores;
