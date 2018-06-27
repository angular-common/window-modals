import {ModalController} from './modal.controller.s';
import {AngularModalComponent} from '../angular.modal.c';

export class AngularModalService {

	private static i: AngularModalService = null;

	private controllers: {[key: number] : ModalController} = {};

	private controllerMap: {[key: string] : number} = {};

	private mapCounter: number = 0;

	constructor() {}

	public static init() {

		AngularModalService.i = new AngularModalService();

	}

	public static add(component: AngularModalComponent) {

		if(AngularModalService.i === null)
			AngularModalService.init();

		const s = AngularModalService.i;
		const c = new ModalController(component);
		const counter = s.mapCounter++;

		console.log("Adding component");
		console.log(component);

		s.controllers[counter] = c;
		AngularModalService.i.controllerMap[c.name] = counter;

		component.id = counter;

	}

	public static close(name: string) {

		if(AngularModalService.i === null)
			AngularModalService.init();

		const s = AngularModalService.i;

		if(s.controllerMap.hasOwnProperty(name)) {

			const id = s.controllerMap[name];
			const controller = s.controllers[id];

			controller.closeAll();

		}

	}

	public static find(name: string) : ModalController {

		if(AngularModalService.i === null)
			AngularModalService.init();

		const s = AngularModalService.i;

		console.log(s.controllers);

		if(s.controllerMap.hasOwnProperty(name)) {

			console.log("Found Modal controller for name: " + name);

			const id = s.controllerMap[name];
			return s.controllers[id];

		}

		return null;

	}

}
