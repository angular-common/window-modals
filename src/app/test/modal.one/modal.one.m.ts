import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalOneComponent} from './modal.one.c';

@NgModule({
	declarations: [
		ModalOneComponent
	],
	imports: [
		CommonModule
	],
	providers: [],
	exports: [ModalOneComponent],
	entryComponents: [ModalOneComponent]
})

export class ModalTestComponentsModule {}
