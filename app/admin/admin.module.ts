
// Modules
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BugRoutingModule } from './bug-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Component
import { BugListComponent } from './parking-list/bug-list.component'
import { BugDetailComponent } from './parking-detail/bug-detail.component';

//Service
import { AdminService } from './shared/service/admin.service';

@NgModule ({
    imports: [
        SharedModule,
        BugRoutingModule,
        ReactiveFormsModule
     ],
    declarations: [
        BugListComponent,
        BugDetailComponent
     ],
    exports: [ ],
    providers: [ 
        AdminService
         ]
})
export class BugModule { }