import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BugListComponent } from './parking-list/bug-list.component';

@NgModule({
    imports: [ 
        RouterModule.forChild([
            { path: '', redirectTo: 'bugs', pathMatch: 'prefix' },
            { path: 'bugs', component: BugListComponent },
            { path: '**', redirectTo: 'bugs' }
        ])
    ],
    exports: [ RouterModule ]
})
export class BugRoutingModule { }