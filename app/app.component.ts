import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: ` 
    <div class="col-sm-3">
        <router-outlet></router-outlet>
    </div>
    <map-map></map-map>
    
    `,
    styles: [`
        .container {
            margin-top: 5rem;
        }
    `]
})

export class AppComponent { }
