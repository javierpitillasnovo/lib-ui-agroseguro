import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
	selector: '[tableColumn]',
	standalone: true
})
export class TableDirective {
	public readonly template = inject(TemplateRef);
	@Input('header') header!: string;
	@Input('headerIsVisible') headerIsVisible!: boolean;
	@Input('contentAlign') contentAlign: 'flex-start' | 'center' | 'flex-end' = 'center';
}
