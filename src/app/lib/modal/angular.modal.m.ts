import {NgModule} from '@angular/core';
import {AngularModalComponent} from './angular.modal.c';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HostDirective} from './angular.modal.r';
import {AngularModalWindowComponent} from './angular.modal.window.c';
import {AngularModalWindowComponentTitle} from './angular.modal.window.title.c';

@NgModule({
	declarations: [
		AngularModalComponent, HostDirective, AngularModalWindowComponent, AngularModalWindowComponentTitle
	],
	exports: [
		AngularModalComponent, HostDirective, AngularModalWindowComponent, AngularModalWindowComponentTitle
	],
	imports: [
		CommonModule, FormsModule
	],
	entryComponents: [
		AngularModalWindowComponent
	]
})

export class AngularModal {}
