export interface IMealPostTypes {
	id?: number;
	foodName?: string;
	description?: string;
}

export interface IMealPostListTypes {
	id: number;
	uploader: string;
	foodName: string;
	description: string;
	upload: Date;
}
