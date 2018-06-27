import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[view-host]',
})

export class HostDirective {
	constructor(public viewContainerRef: ViewContainerRef) { }
}
