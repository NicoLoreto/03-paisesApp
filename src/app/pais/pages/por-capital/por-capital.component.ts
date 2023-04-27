import { Component, Input } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [`
    
  `]

})
export class PorCapitalComponent{  



  // determino la propiedad del ngModel

  termino: string = '';

  // determino si hay error con una variable

  hayError: boolean = false;

  // creo una propiedad para llamar a pais

  paises: Country[] = []

  // inyecto el servicio

  


  constructor(private paisService : PaisService){}



  buscar(termino: string){

    // comprueba si hay error al buscar
    this.hayError = false
    
    this.termino = termino

    // primero muestra el termino en consola
    // console.log(this.termino)

    // pasa el termino al servicio, si devuelve next no muestra el error, si devuelve error muestra el error,
    // el mensaje de error es el que esta en el html
    this.paisService.buscarCapital(termino)

    //suscribe puede recibir hasta tres argumentos, el primero es next que es la data que recibe
    // el segundo es si hay un error, por lo cual puedo hacer una condicion
    // para que si hay un error muestre el error que le diga. el tercero es el complete que es cuando sabemos que no vamos
    // a recibir nada mas

      .subscribe({
        next: (pais) => {
          
          // console.log(pais);
          this.hayError = false;
          this.paises = pais
          // console.log(pais)

        },
        error: (err) => {
          // console.log('Error');
          // console.log(err)
          this.hayError = true
          this.paises = []
        }
      });

    // si o si necesita suscribite para que el servicio se ejecute
  

    // console.log(this.termino)



  } 

  sugerencias(argumento: string){
    this.hayError = false
    // console.log(argumento)
  }

}
