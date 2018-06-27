import {WindowStack} from './window.stack';
import {ModalComponent, StaticModalComponent} from '../angular.modal.i';
import {AngularModalComponent} from '../angular.modal.c';
import {ComponentRef} from '@angular/core/core';
import {AngularModalWindowComponent} from '../angular.modal.window.c';

export class ModalController {

	public name: string = "default";

	public component: AngularModalComponent = null;

	public windowStack: WindowStack<ComponentRef<AngularModalWindowComponent>> = null;

	public lock: boolean = false;

	private idValue: number = 0;

	/**
	 * Create new Modal controller using Angular Modal Component
	 * --------------------------------------------------------------------------
	 * @param {AngularModalComponent} c
	 */
	constructor(c: AngularModalComponent) {

		this.windowStack = new WindowStack<any>();

		if(c.name !== null)

			this.name = c.name;

		this.component = c;

	}

	/**
	 * Append new component to the modal window
	 * --------------------------------------------------------------------------
	 * @param {StaticModalComponent<ModalComponent>} contentComponent
	 * @param {any} data
	 */
	public append(contentComponent: StaticModalComponent<ModalComponent>, data?: any) {

		/*
		 *	Check if data is sufficient enough to be passed further
		 */
		const d: any = (typeof data !== "undefined" && data !== null) ? data : null;

		/*
		 *	Do something on the lock
		 */
		if(this.lock)

			return;

		/*
		 *	Append modal to window frame
		 */
		const window = this.component.appendModal(contentComponent, d);

		/*
		 *	Apply service information to window
		 */
		window.instance.id = ++this.idValue;
		window.instance.domReference = window.location;
		window.instance.controller = this;
		window.instance.zIndex = (this.windowStack.size() + 1) * 10;

		/*
		 *	Add window to the stack
		 */
		this.windowStack.add(window);

	}

	/**
	 * Close all windows belonging to current controller
	 * --------------------------------------------------------------------------
	 */
	public closeAll() {

		while (!this.windowStack.empty() && !this.lock) {

			const window = this.windowStack.pop();

			window.instance.__closeContent();
			window.destroy();

		}

	}

	/**
	 * Close one last window belonging to current controller
	 * --------------------------------------------------------------------------
	 */
	public closeOne() {

		if(!this.windowStack.empty() && !this.lock) {

			const window = this.windowStack.pop();
			window.instance.__closeContent();
			window.destroy();

		}

	}

	/**
	 * Close window with specific ID
	 * --------------------------------------------------------------------------
	 * @param {number} id
	 */
	public closeId(id: number) : boolean {

		let closed: boolean = false;

		if(!this.windowStack.empty() && !this.lock) {

			// Lock controller until operation resolved
			this.lock = true;

			console.log("Closing ID " + id);
			console.log(this.windowStack);

			try {

				const res = this.tossOutWindowId(id);

				console.log("Toss operation returned");
				console.log(res);

				res.window.instance.__closeContent();
				res.window.destroy();

				this.windowStack = res.stack;

			} catch (e) {

				console.error("Close id operation of Modal window failed with error", e);

			}

			// Unlock controller
			this.lock = false;

		}

		return closed;

	}

	/**
	 * Put some window on top of other windows on stack
	 * --------------------------------------------------------------------------
	 * @param {number} id
	 * @returns {boolean}
	 */
	public top(id: number) : boolean {

		let topped: boolean = false;

		if(!this.windowStack.empty() && !this.lock) {

			// Lock current controller
			this.lock = true;

			try {

				const res = this.tossOutWindowId(id);

				/*
				 *	Get new stack parameters
				 */
				const size = res.stack.size();
				const stack = res.stack.peekStack();

				/*
				 *	Traverse over window stack array
				 */
				for(let i = 0; i < size; i++) {

					const window = stack[i];

					// Check if window exists
					if(window !== null)

						// Apply new zIndex order to every window
						window.instance.zIndex = (i + 1) * 10;

				}

				/*
				 *	Apply top window new Z-order
				 */
				res.window.instance.zIndex = (this.windowStack.size() + 1) * 10;

				/*
				 *	Apply new window stack to the main window stack
				 */
				this.windowStack = res.stack;

				/*
				 *	Apply topped window to the top of the stack
				 */
				this.windowStack.add(res.window);

			} catch (e) {

				console.error("Close id operation of Modal window failed with error", e);

			}

			// Unlock controller
			this.lock = false;

		}

		return topped;

	}

	/**
	 * Toss out window with some Id and return result of clean stack and window
	 * --------------------------------------------------------------------------
	 * @param {number} id
	 * @returns {}
	 */
	private tossOutWindowId(id: number) : {
		stack : WindowStack<ComponentRef<AngularModalWindowComponent>>,
		window: ComponentRef<AngularModalWindowComponent>} {

		const newStack = new WindowStack<ComponentRef<AngularModalWindowComponent>>();

		const oldStack: Array<ComponentRef<AngularModalWindowComponent>> = [];

		let window: ComponentRef<AngularModalWindowComponent> = null;

		while (!this.windowStack.empty()) {

			const el = this.windowStack.pop();

			if (el.instance.id !== id)

				oldStack.push(el);

			else

				window = el;

		}

		for (let i = oldStack.length - 1; i >= 0; i--) {

			newStack.add(oldStack[i]);

		}

		return {
			stack: newStack,
			window: window
		}

	}

}
