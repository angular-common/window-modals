import {Component, Input} from '@angular/core';

@Component({
	selector: 'modal-one',
	template: `
		
		<h2> MODAL APPENDED </h2>
		
		<p>
			Value {{data !== null ? data.id : 'none'}}
		</p>
		
	`,
	styles: [`
		
	`]
})

export class ModalOneComponent {

	@Input() public data = null;

	constructor() {

	}

}
