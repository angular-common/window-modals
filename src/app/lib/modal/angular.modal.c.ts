import {Component, ComponentFactoryResolver, ComponentRef, HostBinding, Input, Type, ViewChild} from '@angular/core';
import {HostDirective} from './angular.modal.r';
import {AngularModalWindowComponent} from './angular.modal.window.c';
import {AngularModalService} from './service/angular.modal.service.s';

@Component({
	selector: 'angular-modal',
	template: `
		
		<ng-template view-host></ng-template>
		
	`,
	styles: [`
		:host {
			position: absolute;
			z-index: 0;
		}
	`]
})

export class AngularModalComponent {

	/*
	 *	Common property setters
	 */

	public id: number = null;

	private _name: string = null;

	@Input() public set name(name: string) {

		if(name !== null) {

			this._name = name;

			AngularModalService.add(this);

		}

	}

	public get name() {

		return this._name;

	}

	// public active: boolean = true;

	/*
	 *	Private property setters and bindings
	 */

	private _width: number = 0;
	private _height: number = 0;

	// @HostBinding("style.width") public hostWidth = "100%";
	// @HostBinding("style.height") public hostHeight = "100%";

	/*
	 *	Directives
	 */

	@ViewChild(HostDirective) vc: HostDirective;

	constructor(private resolver: ComponentFactoryResolver) {

		this.bindResizeEvents();

	}

	/**
	 *
	 * ----------------------------------------------------------------------------------
	 * @param {Type<any>} c
	 * @param d
	 * @returns {ComponentRef<AngularModalWindowComponent>}
	 */
	public appendModal(c: Type<any>, d: any) : ComponentRef<AngularModalWindowComponent> {

		const window = AngularModalWindowComponent;

		const factory = this.resolver.resolveComponentFactory(window);
		const container = this.vc.viewContainerRef;
		const windowComponent = container.createComponent(factory);

		(<AngularModalWindowComponent>windowComponent.instance).appendModalContent(c, d);

		return windowComponent;

	}

	/**
	 * Bind events which are related to window resize for current modal component
	 * ----------------------------------------------------------------------------------
	 */
	private bindResizeEvents() {

		const f: any = (ev?: any) => {

			this._height = window.innerHeight;
			this._width = window.innerWidth;
			// this.hostWidth = this._width + "px";
			// this.hostHeight = this._height + "px";
		};

		window.addEventListener("resize", f);

		f();

	}

}
