import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AngularModal} from './lib/modal/angular.modal.m';
import {ModalTestComponentsModule} from './test/modal.one/modal.one.m';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule, AngularModal, ModalTestComponentsModule
	],
  	providers: [],
  	bootstrap: [AppComponent]
})
export class AppModule { }
