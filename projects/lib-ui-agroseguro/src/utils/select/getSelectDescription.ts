export function getSelectDescription(event: Event): string {
	let selectElement = event.target as HTMLSelectElement;
	let selectedOption = selectElement.options[selectElement.selectedIndex];
	return selectedOption.text;
}
