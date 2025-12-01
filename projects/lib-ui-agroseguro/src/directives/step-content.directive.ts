import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
	selector: '[stepContent]',
	standalone: true
})
export class StepTemplateDirective {
	public readonly template = inject(TemplateRef);
	@Input('step') stepNumber!: number;
}
