export interface StaticModalComponent<T> {
	new (...args: any[]) : T;
}

export interface ModalComponent {
	data?: any;
	title?: string;
}

export interface ModalViewParameters {
	frameId?: string;
	contentId?: string;
	frameClassName?: string;
	contentClassName?: string;
	autoSize?: boolean;
	title?: string;
	closeButton?: boolean;
	scrollable?: boolean;
	paddingTop?: number;
	paddingLeft?: number;
	paddingBottom?: number;
	paddingRight?: number;
	height?: number;
	width?: number;
	maxHeight?: number;
	maxWidth?: number;
	minHeight?: number;
	minWidth?: number;
}

export interface ModalWindowMoveInterface {
	x: number;
	y: number;
}
