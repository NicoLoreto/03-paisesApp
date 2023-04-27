import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';



@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styles: [
    `
      .tabla{
        font-size: 1.2rem;
        width: 100%;
        margin: 0;
        padding:0
      }
      .a{
        color: white
      }
    
    `
  ]

})


export class PaisTablaComponent {


// los input sirven para traer las propiedades desde otro componente
// como hayError lo deje de usar lo comento

@Input() paises: Country[] = []
// @Input() hayError: boolean = false

@Input() placeHolder: string = ''




}
