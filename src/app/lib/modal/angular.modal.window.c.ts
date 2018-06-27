import {
	Component, ComponentFactoryResolver, ComponentRef, ElementRef, HostBinding, HostListener, Input, Type,
	ViewChild
} from '@angular/core';
import {HostDirective} from './angular.modal.r';
import {ModalComponent, ModalWindowMoveInterface} from './angular.modal.i';
import {ModalController} from './service/modal.controller.s';

@Component({
	selector: 'angular-modal-window',
	template: `
		
		<div id="{{windowId}}" class="am-modal-window-frame {{windowClassName.length > 0 ? windowClassName : ''}}">
			
			<!--<div class="am-modal-top-frame">
				
				<button class="am-modal-top-close-btn" (click)="close()">&#10005;</button>
			
			</div>-->
			
			<angular-modal-window-title (onClose)="close($event)" (onDrag)="setPosition($event)">
				
			</angular-modal-window-title>
			
			<div id="{{contentId}}" class="am-modal-window-content {{contentClassName.length > 0 ? contentClassName : ''}}">

				<ng-template view-host></ng-template>
				
			</div>
			
		</div>
		
	`,
	styles: [`
		
		:host {
			position: absolute;
			width: auto;
			height: auto;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-o-user-select: none;
			user-select: none;
		}
		
		.am-modal-window-frame {
			overflow: hidden;
			border: 1px solid #dedede;
			background: #f8f8f8;
		}
		
		.am-modal-window-content {
			position: relative;
			overflow-y: scroll;
		}
		
		.am-modal-top-close-btn {
			position: absolute;
			right: 0;
			max-width: 32px;
		}
		
		.am-modal-top-frame {
			position: relative;
			width: 100%;
			height: 32px;
			overflow: hidden;
			border-bottom: 1px solid rgba(0.2,0.2,0.2,0.1);
		}
		
	`]
})

export class AngularModalWindowComponent {

	public id: number = null;

	public domReference: ElementRef = null;

	/**
	 * Reference to nested component
	 * @type {null}
	 */
	public contentComponent: ComponentRef<ModalComponent> = null;

	/**
	 * Reference to controller providing operational manipulations
	 * @type {null}
	 */
	public controller: ModalController = null;

	/*
	 *	Public properties which can be inherited via ModalViewParameters interface
	 */

	public title: string = "";

	public windowId: string = "";

	public windowClassName: string = "";

	public contentId: string = "";

	public contentClassName: string = "";

	/*
	 *	Public styling parameters can be applied with nested properties or by syste,
	 */

	@HostBinding("style.z-index") public zIndex: number = 1;
	@HostBinding("style.left") public positionLeft: string = "0px";
	@HostBinding("style.top") public positionTop: string = "0px";

	/*
	 *	Container directive
	 */

	@ViewChild(HostDirective) vc: HostDirective;

	/**
	 * Set nested view
	 * ------------------------------------------------------------------------
	 * @param view
	 */
	@Input() public set nestedView(view: any) {

		this.appendModalContent(view, null);

	}

	/**
	 * Construct new window with factory resolver
	 * ------------------------------------------------------------------------
	 * @param {ComponentFactoryResolver} resolver
	 */
	constructor(private resolver: ComponentFactoryResolver) {}

	/**
	 * Append some component to be a content of a Modal Window
	 * ------------------------------------------------------------------------
	 * @param {Type<any>} component
	 * @param {any} data
	 * @returns {ComponentRef<ModalComponent>}
	 */
	public appendModalContent(component: Type<any>, data: any) : ComponentRef<ModalComponent> {

		const factory = this.resolver.resolveComponentFactory(component);

		const container = this.vc.viewContainerRef;

		this.contentComponent = container.createComponent(factory);

		this.applyNestedProperties(this.contentComponent.instance);

		if(typeof this.contentComponent.instance.data !== "undefined")

			this.contentComponent.instance.data = data;

		return this.contentComponent;

	}

	/**
	 * Do full window destruction
	 * ------------------------------------------------------------------------
	 */
	public close() {

		if(this.controller !== null) {

			this.controller.closeId(this.id);

		}

	}

	/**
	 * Erase contents of the window
	 * ------------------------------------------------------------------------
	 * @private
	 */
	public __closeContent() {

		if(this.contentComponent !== null) {

			this.contentComponent.destroy();

		}

	}

	public setPosition(pos: ModalWindowMoveInterface) {

		console.log("Position came: ", pos);
		this.setTopOffset(pos.y);
		this.setLeftOffset(pos.x);

	}

	public setTopOffset(value: number) {

		const currentHeight = this.domReference.nativeElement.clientHeight;

		console.log("Position top results in ");
		console.log("COORDINATE Y: " + value);
		console.log("Window height: " + currentHeight);

		this.positionTop = (Number(value) - (currentHeight / 2) + 48) + "px";

		console.log("New position: " + this.positionTop);

	}

	public setLeftOffset(value: number) {

		const currentWidth = this.domReference.nativeElement.clientWidth;

		this.positionLeft = (Number(value) - currentWidth / 2) + "px";

	}

	/**
	 * Apply nested properties to main window
	 * ------------------------------------------------------------------------
	 * @param {ModalComponent} component
	 */
	private applyNestedProperties(component: ModalComponent) {

		if(component.hasOwnProperty("title")) {

			if(component.title !== null)

				this.title = component.title;

		}

	}

}
