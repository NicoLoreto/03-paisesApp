import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  
 // el HTTPClientModule lo importo en app component
  // porque le voy a dar un uso global

  // lo que hace es realizar solicitudes HTTP a un servidor externo

    // creo la variable para la url de la api de restcountry

    private apiUrl: string = "https://restcountries.com/v2"

    // importo el servicio HttpClient
    
  constructor(private http: HttpClient) { }

  // el metodo buscarPais retorna la peticion a quien lo mando a llamar
  // buscarPais recibe un string y retorna un observable
  // para determinar que tipo de dato sera el Obsrvable tengo que copiar el codigo de cualquier peticion que haga
  //en Postman y usarlo en https://quicktype.io/ . Me va a entregar un tipo de dato que voy a usar para crear la interface
  // como se que Country va a devolver un pais que tendra un arreglo le pongo []
  // tmb se lo debo poner al get

  buscarPais(termino: string): Observable <Country[]>{

    //guardo el valor de la peticion en una constante que tendra la url

    const url= `${this.apiUrl}/name/${termino}`

    return this.http.get<Country[]>(url, {params : this.httpParams})
      .pipe(
        // tap es una herramienta útil para depurar y monitorear observables en Angular sin modificar los datos que se están emitiendo.
        // tap(console.log)
      )

  }

  // con un get mando los parametros que necesito para filtrar la solicitud y que no sea tan cargada.
  // en cada busqueda agrego el get

  get httpParams(){
    return new HttpParams().set('fields', 'name,capital,flag,alpha2Code,population')
  }

  buscarCapital(termino: string): Observable <Country[]>{

    const url= `${this.apiUrl}/capital/${termino}`

    return this.http.get<Country[]>(url, {params : this.httpParams})


  }

  getPaisPorAlpha(id: string): Observable <Country>{
    
    const url= `${this.apiUrl}/alpha/${id}`

    return this.http.get<Country>(url)
  }

  buscarRegion(region: string): Observable <Country[]>{

    // const parametros = new HttpParams()
    //   .set('fields', 'name,capital,flag,alpha2Code,population')

    const url = `${this.apiUrl}/regionalbloc/${region}`

    return this.http.get<Country[]>(url, { params : this.httpParams})
      .pipe(
        tap(console.log)
      )

  }


}

 