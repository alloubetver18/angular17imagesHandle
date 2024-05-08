import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'imagenes';
  nuevaImagen: string = '';
  imagenCargada: SafeResourceUrl = '';
  base64Image: string | null = null;

  constructor(private sanitizer: DomSanitizer) { }

  /* handleFileSelect(evt: Event){
    var files = (<HTMLInputElement>evt.target).files;
    var file = files![0];
    
    if (files && file) {

      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: ProgressEvent<FileReader>) {
    var binaryString = readerEvt.target!.result as string;
    this.nuevaImagen = btoa(binaryString);  // Convierte la cadena binaria en base64
    console.log(this.nuevaImagen);
  } */

  cargarImagen(){
    if(this.base64Image==null){
      alert("No hay imagen cargada en memoria.");
    }else{
      this.imagenCargada = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
    }
    
  }

  handleImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    if(file!=undefined){
      const fileReader = new FileReader();
    fileReader.onloadend = () => {
        const image = new Image();
        image.onload = () => {
            const width = image.width;
            const height = image.height;
            const format = file.type.split('/')[1];
            console.log(`Formato: ${format}, Ancho: ${width}px, Alto: ${height}px`);
            console.log("Longitud de la cadena: "+(fileReader.result as string).length);
            if ((format === 'jpeg' || format === 'png') && width <= 2048 && height <= 2048) {
                this.base64Image = fileReader.result as string;
                console.log(this.base64Image);
                console.log("Longitud de la cadena: "+this.base64Image.length);
                console.log("tamaño del archivo: "+((this.base64Image.length/1.37)/1024)+" kb");
              } else if (format !== 'jpeg' && format !== 'png') {
                console.log('El archivo seleccionado no es una imagen jpg o png');
            } else if (width > 2048 || height > 2048) {
                console.log('Las dimensiones de la imagen son mayores a 1024x720px');
            }
        };
        image.onerror = () => {
          console.log("El archivo seleccionado no es un archivo de imagen válido.");
        }
        image.src = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
    }
    
  }
}
