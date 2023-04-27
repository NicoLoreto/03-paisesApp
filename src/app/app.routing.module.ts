//las rutas direccionan, se crea dentro
//de app

import {NgModule} from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PorPaisComponent } from './pais/pages/por-pais/por-pais.component';
import { PorRegionComponent } from './pais/pages/por-region/por-region.component';
import { PorCapitalComponent } from './pais/pages/por-capital/por-capital.component';
import { VerPaisComponent } from './pais/pages/ver-pais/ver-pais.component';

// lo primero es crear una const
// de tipo Routes
// sera un array que contendra objetos
// el path indica la url donde estare
// se esta vacio sera la raiz
// ese obj dira que cuando el path este ahi
// mostrara ese componente
// pathMatch: 'full' es que es el primer componente que quiero mostrar 

const routes: Routes = [
    {
        path: '',
        component: PorPaisComponent,
        pathMatch: 'full'
    },

    {
        path: 'region',
        component: PorRegionComponent
    },

    {
        path: 'capital',
        component: PorCapitalComponent
    },

    {

        // como sera una vista que dependera de la busqueda que haga se agrega /: y el codigo que usare, 
        // en este caso id

        path: 'pais/:id',
        component: VerPaisComponent
    },

    {

        //excepcion, si la pagina no existe redireccionara al inicio

        path: '**',
        redirectTo: ''
    },

]



//RouterModule exporta el <router-outlet> para usar en el componente







//importo el modulo RouterModule, usare el forRoot porque estoy queriendo la raiz y lo que le paso es el
// arreglo. 

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],

    exports:[
        RouterModule
    ]

    //EXPORTO LA CLASE

})
export class AppRoutingModule{

}