import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class documentService {
	downloadDocument(data: string, contentType: string, name: string, ext: string) {
		// Decodificar el Base64 a datos binarios
		let binaryData = atob(data);

		// Crear un array de bytes a partir de los datos binarios
		let bytes = new Uint8Array(binaryData.length);
		for (let i = 0; i < binaryData.length; i++) {
			bytes[i] = binaryData.charCodeAt(i);
		}

		// Crear un Blob a partir de los bytes
		let blob = new Blob([bytes], {
			type: contentType
		});

		// Crear una URL para el Blob
		let blobUrl = URL.createObjectURL(blob);

		// Crear un enlace <a> y configurarlo para la descarga
		let a = document.createElement('a');
		a.href = blobUrl;
		a.download = `${name}.${ext}`; // Nombre del archivo de descarga

		// Simular un clic en el enlace para iniciar la descarga
		a.click();

		// Liberar la URL del Blob después de la descarga
		URL.revokeObjectURL(blobUrl);
	}
}
