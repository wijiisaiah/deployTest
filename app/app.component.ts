import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: ` <div class="container">
        <router-outlet></router-outlet>
        <map-map></map-map>
    </div>
    
    `,
    styles: [`
        .container {
            margin-top: 5rem;
        }
    `]
})

export class AppComponent { }
