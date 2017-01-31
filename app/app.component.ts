import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: ` 
    <div class="col-sm-3">
        <router-outlet></router-outlet>
    </div>
    <map-map></map-map>
    
    `,
    styles: []
})

export class AppComponent { }
