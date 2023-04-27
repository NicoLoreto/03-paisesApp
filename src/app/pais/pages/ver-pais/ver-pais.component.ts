import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, Observable, tap } from 'rxjs';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

// en este componente voy a mostrar todas las propiedades del pais que busco
// para eso tengo que generar un Obsrvable que me indique si ha habido cambios y suscribirme a ellos, porq
// la url puede ir cambiando

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles:[
    `
    .conteiner .nombre{
      justify-content: center;
      align-items: center;
      text-align: center;
      color: white;
      font-size: 4rem;
      font-weight: 900
    }


    .list-group-item{
      padding: .6rem
    }

    @media (max-width: 767px) {
      .conteiner .nombre .h3{
        font-size: 1rem
      }
      
   
    }
    
    `
  ]
})
export class VerPaisComponent implements OnInit{

  // el constructor se ejecuta siempre
  // el ngOnInit solo cuando el componente es inicializado

  //inyecto el ActivatedRoute para suscribisrse a los cambios del url y el servicio

pais!: Country 

  constructor(
    private activateRoute: ActivatedRoute,
    private servicio: PaisService,
  ){}


  ngOnInit(): void {

    // ngOnInit se usa cuando quieres hacer algo apenas carga la página, entonces apenas carga la pagina se 
    // llama a activatedRoute.params y lo que hace es ver cual código de país está en los parámetros de la 
    // URL y depende a ese codigo se muestra la informacion de ese pais.

    // la desestructuracion extrae la propiedad directamente del termino usando en este caso [''] de params
    // extrae el id
    // con el servicio pido que me de la url y desp me suscribo a esos cambios

    // this.activateRoute.params
    //   .subscribe(params => {
    //     console.log( params['id'])
    //     this.servicio.getPaisPorAlpha(params['id'])
    //       .subscribe(pais=>{
    //         console.log(pais)
    //       })
    //   })

    // otra forma mas corta de hacerlo es con el metodo switchMap() usando pipe, lo que hace es devolver otro Observable. 
    // Toma uno y devuleve otro
    // tap lo que hace es ejecutar la funcion que se le pasa inmediatamente desp de la anterior

    this.activateRoute.params

      .pipe(switchMap((parametro) => this.servicio.getPaisPorAlpha(parametro['id'])), tap ()
      ) 
        .subscribe(item => {
            this.pais = item
          });
        }
      
      
    

  }


