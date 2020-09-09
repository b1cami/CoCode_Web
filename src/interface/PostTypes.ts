export interface IPostListTypes {
	id: number;
	uploader: string;
	title: string;
	content: string;
	upload: Date;
}

export interface IPostWriteTypes {
	title: string;
	content: string;
}

export interface IPostCommentTypes {
	comment: string;
	postId: number;
}

export interface IPostCommentReadTypes {
	id: number;
	userName: string;
	comment: string;
	upload: Date;
}
