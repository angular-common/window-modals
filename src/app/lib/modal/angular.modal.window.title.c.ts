import {
	Component, EventEmitter, HostBinding, HostListener, Input, Output
} from '@angular/core';
import {ModalWindowMoveInterface} from './angular.modal.i';
import Timer = NodeJS.Timer;

@Component({
	selector: 'angular-modal-window-title',
	template: `
		
		<button class="am-modal-top-close-btn" (click)="close()">&#10005;</button>
		
	`,
	styles: [`
		
		:host {
			display: block;
			position: relative;
			width: 100%;
			overflow: hidden;
			border-bottom: 1px solid #dedede;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-o-user-select: none;
			user-select: none;
		}

		.am-modal-top-close-btn {
			position: absolute;
			right: 0;
			max-width: 32px;
			height: 32px;
			width: 32px;
		}
		
	`]
})

export class AngularModalWindowComponentTitle {

	public moveLockCoordinates: ModalWindowMoveInterface = {x:0, y:0};

	public lastKnownCoordinates: ModalWindowMoveInterface = {x:0, y:0};

	public dragReleaseHappened: boolean = true;

	public moveLockId: Timer = null;

	@Output() public onClose = new EventEmitter<void>();

	@Output() public onDrag = new EventEmitter<ModalWindowMoveInterface>();

	private moveFunction = (e: any) => {

		console.log("Mouse position when drag started");
		console.log(e);

		const coords = {
			x: e.clientX,
			y: e.clientY
		};

		this.onDrag.emit(coords);

		this.lastKnownCoordinates = coords;

	};

	private onMove: boolean = false;

	@HostBinding("style.height") public height = "32px";

	@HostListener("mousedown") onMouseDown() {

		this.startRecordingMouseCords();

		this.dragReleaseHappened = false;

	}

	@HostListener("mouseup") onMouseUp() {

		this.stopRecordingMouseCords();

		this.dragReleaseHappened = true;

	}

	@HostListener("mouseout") onMouseOut() {

		if(this.onMove) {

			this.moveLockId = setInterval(() => {

				if(this.dragReleaseHappened) {

					this.stopRecordingMouseCords();
					clearInterval(this.moveLockId);

				}

			},100);

		}

	}

	public startRecordingMouseCords() {

		window.addEventListener("mousemove", this.moveFunction);

		this.onMove = true;

	}

	public stopRecordingMouseCords() {

		window.removeEventListener("mousemove", this.moveFunction);

	}

	public close() {

		this.onClose.emit();

	}

}
