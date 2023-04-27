import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li{
        cursor: pointer
      }
    
    `
  ]

})
export class PorPaisComponent {
  // determino la propiedad del ngModel

  termino: string = '';

  // determino si hay error con una variable

  hayError: boolean = false;

  // creo una propiedad para llamar a pais

  paises: Country[] = [];

  paisesSugeridos: Country[] = [];

  mostrarSugerencias: boolean = false;

  // inyecto el servicio

  constructor(private paisService : PaisService){}



  buscar(termino: string){

    this.mostrarSugerencias = false;

    // comprueba si hay error al buscar
    this.hayError = false
    
    this.termino = termino

    // primero muestra el termino en consola
    // console.log(this.termino)

    // pasa el termino al servicio, si devuelve next no muestra el error, si devuelve error muestra el error,
    // el mensaje de error es el que esta en el html
    this.paisService.buscarPais(termino)

    //suscribe puede recibir hasta tres argumentos, el primero es next que es la data que recibe
    // el segundo es si hay un error, por lo cual puedo hacer una condicion
    // para que si hay un error muestre el error que le diga. el tercero es el complete que es cuando sabemos que no vamos
    // a recibir nada mas

      .subscribe({
        next: (pais) => {
          
         
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
    this.termino = argumento
    this.mostrarSugerencias = true
    // console.log(argumento)

    //buscar en el servicio

    this.paisService.buscarPais( argumento )
      .subscribe(
        paises =>{
          this.paisesSugeridos = paises.splice(0,5)
        },
          (err) => {
            this.paisesSugeridos =[]
        }
      )
    
  }

  buscarSugerido(termino: string){

    this.buscar(termino);
    
    

  }

}
