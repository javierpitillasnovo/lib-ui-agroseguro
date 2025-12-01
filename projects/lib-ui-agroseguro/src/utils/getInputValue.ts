// Definimos una función que maneja el evento y retorna el valor del input
export function getInputValue(event: Event): string {
	let input = event.target as HTMLInputElement;
	return input.value;
}

export function getCheckboxValue(event: Event): boolean {
	let input = event.target as HTMLInputElement;
	return input.checked;
}
