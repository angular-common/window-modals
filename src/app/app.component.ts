import { Component } from '@angular/core';
import {AngularModalService} from './lib/modal/service/angular.modal.service.s';
import {ModalOneComponent} from './test/modal.one/modal.one.c';

@Component({
  selector: 'app-root',
  template: `
		
	  <angular-modal [name]="'testModal'"></angular-modal>
	  
	  <button (click)="applyModal()"> Append something to Modal</button>
	  
	  <button (click)="clearAllWindows()"> Clear all windows which are on screen </button>
	  
	`,
  styles: [`
	
	`]
})
export class AppComponent {

	public ident: number = 1;

	constructor() {

	}

	public applyModal() {

			AngularModalService.find("testModal").append(ModalOneComponent, {id: this.ident++});

	}

	public clearAllWindows() {

		AngularModalService.find("testModal").closeAll();

	}

}
