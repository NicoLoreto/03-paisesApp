import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`

  .h5{
    display: none
  }
    button{
      margin-right: 5px;
      color: white;
      border-color: white;
      font-size: 2rem;
      margin: 1rem;
      justify-content: center;
      align-items: center;

    }

    .col{
    justify-content: center;
    text-align: center;
    
  }

  @media (max-width: 767px){
    .container{

      width: 100%;
      margin: 0;
      padding: 0;

    }

    .tabla{
      /* background: red; */
      width: 100%;
      margin: 0;
      padding:0    
  }

    button{
      font-size: 1.5rem
    }
  }
    `
  ]
  
})
export class PorRegionComponent {
  
  regiones: string [] = ['EU', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU', 'AL', 'ASEAN', 'CAIS', 'CEFT', 'NAFT', 'SAARC']

  regionActiva: string = ''

  paises: Country [] = [ ]

  constructor(private regionServicio: PaisService ){}

  activarRegion(region: string){

    // si ya tengo cargados los paises no hago nada

    if(region === this.regionActiva){return}
    
    this.regionActiva = region
    //pongo paises en 0 de nuevo para que recargue paises, purgo paises
    this.paises = []

 // hacer llamado al servicio

    this.regionServicio.buscarRegion(region)
      .subscribe (paises => {
        // console.log(paises)
        this.paises = paises
      })




  }

  getClaseCSS (region: string): string{
    return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary';
  }


  mostrarRegion(termino: string){

    this.regionActiva = termino

    
  }
 
}
