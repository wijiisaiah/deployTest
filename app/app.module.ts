// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from './users/user.module';
import { CoreModule } from './core/core.module';

//Components
import { AppComponent } from './app.component';

@NgModule({
    imports: [ 
        BrowserModule,
        UserModule,
        CoreModule.forRoot()
         ],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }