import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, Observable, debounceTime } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
 
})

// tengo que implementar el onInit

export class PaisInputComponent implements OnInit {
 
  // voy a hacer un output para enviar el this.termino que ira como argumento en buscar() cuando
  // se emita un evento. lo llamo onEnter, sera un EventoEmitter que emitira un string y hara un
  // new EventEmitter

 
  @Output() onEnter : EventEmitter <string> = new EventEmitter();

  // pais input va a recibir la propiedad que le envio

  @Input() placerHolder: string = ''

  // DEBOUNCES 

  //  uno es cuando se envía el formulario (onEnter) y el otro es mientras aun se modifica 
  //el valor del input (onDebounce).

  //un debounce, en pocas palabras es una funciton que se recomienda usar cuando queremos disparar 
  //de manera limitada una búsqueda cada vez que la persona escriba

  //onDebounce sera el encargado de almacenar el termino de búsqueda que el usuario este ESCRIBIENDO
  @Output() onDebounces: EventEmitter <string> = new EventEmitter();

  //rx viene con subject para crear un observable, que define el tipo. un observable es algo que esta
  // escuchando todo lo que pase en el componente y compartiendolo con otro.
  // para usarlo lo tengo q inicializar. asi puedo acceder a sus valor suscribite*
  // es de tipo string porq sera lo q el usuario este escribiendo

  debounces: Subject <string> = new Subject()




termino: string = ''


ngOnInit(): void {


      // debemos decirle a Angular que queremos estar al pendientes de los cambios que se produzcan en el 
      //debouncer (subject) Esto se logra con el this.debouncer y su method .subscribe donde recibimos ese valor 
      // o termino.
      
      // this.debounces
      //   .subscribe ((valor)=>{
      //     console.log(valor)
      //   })

      // ya estamos al pendientes de los cambios que se produzcan en 2 sitios: 
      // 1. En el input (gracias al teclaPresionada
      // 2. Y en el debouncer (subject) gracias al .subscribe

      
      //De momento queremos imprimir ese console.log cuando el usuario *ha dejado de describir* por 300ms 
      //Es decir, NO queremos emitir o *ejecutar* el *subscribe* y el codigo que contenga sino hasta que ha 
      //pasado un cierto tiempo.
      // podemos utilizar una solución propia de RxJs llamada debounceTime que es el corazon de una funcion debouncer.
      //el debounceTime emite una notificación al observable solo DESPUES de que ha pasado un periodo 
      //de tiempo en particular (establecido por nosotros)
      //debemos importarlo de 'rxjs/operators' 


      // Debemos *transformar* la salida del subscribe
      // Para hacer esto utilizaremos la función pipe
      // Nota: NO nos referimos a los pipes de Angular.Porque los pipes de Angular son funciones usadas en 
      // templates, no en una lógica como esta.
      //El pipe que usaremos es para un Observable y NO hace falta importar nada. Lo pondremos antes de suscribite
      // y pasaremos 300ms. Cabe destacar que si presionas una tecla SE VUELVE A REINICIAR esa cuenta de 300ms a 0ms.

      // this.debounces
      //   .pipe(debounceTime(
      //     300
      //   ))
      //   .subscribe ((valor)=>{
      //   console.log(valor)
      // })

      // para poder realizar una request a la API de paises, necesita ese termino.
      // Como podemos pasarselo?
      // Si recuerdas teníamos un evento personalizado llamado onDebounce  
      // Es justo a ese evento al que le queremos transmitir el valor.

      //  this.debounces
      //   .pipe(debounceTime(
      //     300
      //   ))
      //   .subscribe ((valor)=>{

      //   ahora estoy haciendo la peticion

      //   console.log(this.onDebounces.emit(valor))
      // })

      //quiero que esa vigilancia a los cambios después de 300ms se realice DESDE QUE SE RENDERICE el 
      //componente. Entonces necesito usar un ciclo de vida onInit
      // 1. Realiza la importación del *onInit* que proviene de '@angular/core' (impórtalo junto con las demás que ya tienes en el componente)
      // 2. Impleméntalo a tu *class* con la palabra reservada implements y el ciclo de vida. Es decir: export class PaisInputComponent *implements* onInit {}
      // 3. Llama al onInit   

      // Ya estamos emitiendo lo que el usuario escribió, pero de nuevo, esto esta flotando en el aire. 
      // Nadie lo esta escuchando.

      // Dado que es en por-pais.component.ts donde estamos ejecutando los methods para llamar al 
      // service y entonces ejecutar las búsquedas en la API, es ahi, en la renderización del input,
      // donde debemos escuchar nuestro evento personalizado, asociarlo a un nuevo método, solicitar el termino 
      // y entonces hacer la request a la API.


  this.debounces
    .pipe(debounceTime(
      300
    ))
    .subscribe ((valor)=>{
    // ahora estoy haciendo la peticion
    this.onDebounces.emit(valor)
    })
      
  
}


busca(){

    // console.log(this.termino)
  
    // recibe el evento cuando haga enter

    this.onEnter.emit(this.termino)
    //*
    this.debounces.subscribe()

}


//vamos a crear un method llamado teclaPresionada. Dentro usaremos el *method .next() 
//disponible en los Subjects. El .next()* sirve para enviar mensajes a un observable (debouncer) 
//que luego envía a todos los componentes  que son subscriptores de ese observable
//esto conecta el debouncer con el input. al estar suscriptos al debouncer recibimos los cambios 
//cuando el usuario escribe

teclaPresionada(){

  // el next junto con el debounces nos aseguran que todos las suscripciones reciban el mismo valor
  //Este method require de un valor que sera asociado al Subject y estará disponible en quienes estén 
  //subscritos a el.
  //Que es lo que queremos emitir para poder realizar las siguerencias? Pues el termino, es decir, 
  //lo que el usuario esta colocando en el input.
  //Para poder pasar ese termino al Subject necesitamos asociarlo con el evento input en el input HTML
  //- (submit) es asociado con la etiqueta form y es utilizado para ejecutar acciones al POSTEAR un 
  // formulario. Al enviar su info, en este caso con la tecla ENTER
  // - (input) sirve para escuchar por cambios en la caja de texto. Es decir que si tu escribes "hol" y 
  //después "hola" vas a estar escuchando por ese cambio de caracteres. Letra por letra.
  // Debemos escuchar el evento input y asociarlo con el method teclaPresionada. 
  // Para que cada vez que el usuario escriba algo, nosotros le mandemos ese nuevo texto o termino 
  // al Subject, 
  //y entonces ejecutemos la búsqueda para mostrar sugerencias.
  
  this.debounces.next(this.termino)

  
  

}



}
