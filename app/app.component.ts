import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: ` 
    <div class="col-sm-12">
        <router-outlet></router-outlet>
    </div>
    
    `,
    styles: [`
        .col-sm-12 {
            padding: 0;
        }
    `]
})

export class AppComponent {
}
