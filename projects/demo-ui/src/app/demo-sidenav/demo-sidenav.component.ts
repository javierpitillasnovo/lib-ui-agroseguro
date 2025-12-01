import { Component } from '@angular/core';
import { UiSidenavComponent } from '@lib-ui-agroseguro';

@Component({
	selector: 'app-demo-sidenav',
	standalone: true,
	imports: [UiSidenavComponent],
	templateUrl: './demo-sidenav.component.html',
	styleUrl: './demo-sidenav.component.scss'
})
export class DemoSidenavComponent {
	/**{
        label: 'Ejemplo Nivel 1',
        icon: 'icon-icon',
        children: [
            { label: 'Opción 1.1', link: '/opcion11' },
            { label: 'Opción 1.2', link: 'opcion12' },
            {
                label: 'Ejemplo Nivel 2',
                children: [
                    { label: 'Opción 2.1', link: 'opcion21' },
                    { label: 'Opción 2.2', link: 'opcion22' },
                    {
                        label: 'Ejemplo Nivel 3',
                        children: [
                            { label: 'Opción 3.1', link: 'opcion31' },
                            { label: 'Opción 3.2', link: 'opcion32' }
                        ]
                    }
                ]
            }
        ]
    }*/
}
