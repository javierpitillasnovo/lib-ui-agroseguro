export interface AppItem {
	name: string;
	isFavorite: boolean;
	hasPermission: boolean;
	link: string;
}

export interface AppGroups {
	groupName: string;
	appItems: AppItem[];
}
