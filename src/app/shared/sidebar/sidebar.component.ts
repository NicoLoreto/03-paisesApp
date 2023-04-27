import { Component } from '@angular/core';


// en styles defino que solo los li tengan cursor pointer

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [

      `li{
        cursor: pointer
      }`
      
  ]
 
})
export class SidebarComponent {
  
  
  
}


