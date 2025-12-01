import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
	selector: '[tabContent]',
	standalone: true
})
export class TabTemplateDirective {
	public readonly template = inject(TemplateRef);
	@Input('title') title!: string;
}
