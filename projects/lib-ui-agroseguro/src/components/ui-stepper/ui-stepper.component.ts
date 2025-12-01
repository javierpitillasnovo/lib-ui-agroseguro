import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	contentChildren,
	input,
	model,
	output,
	signal,
	ViewEncapsulation
} from '@angular/core';
import { StepTemplateDirective } from '../../directives/step-content.directive';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { Steps } from '../../interfaces/steps.interface';

@Component({
	selector: 'ui-stepper',
	standalone: true,
	imports: [NgClass, NgTemplateOutlet, UiButtonComponent],
	templateUrl: './ui-stepper.component.html',
	styleUrl: './ui-stepper.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		hostID: crypto.randomUUID().toString(),
		class: 'stepper'
	}
})
export class UiStepperComponent {
	public steps = input<Steps[]>(); //Data steps
	public buttonsDisabled = model<boolean>(); //Model para controlar si el boton se habilita o no
	public activeStep = signal<number>(1); //Step inicial
	public showInitialButton = signal<boolean>(false); //Boolean para mostrar el botón inicial o no
	public showInitialButtonText = signal<string>(''); //Texto del botón inicial
	public showEndButton = signal<boolean>(false); //Boolean para mostrar un botón de fin
	public showEndButtonText = signal<string>(''); //Texto del botón de fin
	public templates = contentChildren(StepTemplateDirective); //Query de todos los elementos con StepTemplateDirecto
	public initialButtonClicked = output<boolean>(); //Evento para el botón inicial
	public endButtonClicked = output<boolean>(); //Evento para el botón de fin

	//Función para pasar al siguiente paso
	next() {
		if (this.activeStep() < this.templates().length) {
			this.activeStep.set(this.activeStep() + 1);
			this.buttonsDisabled.set(true);
		}
	}

	//Función para volver al paso anterior
	prev() {
		if (this.activeStep() > 1) {
			this.activeStep.set(this.activeStep() - 1);
			this.buttonsDisabled.set(true);
		}
	}
}
