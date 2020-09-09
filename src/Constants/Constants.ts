class Constants {
	public TOKEN_EMPTY() {
		return localStorage.getItem('cocode-token') === null;
	}
}

export default new Constants();
