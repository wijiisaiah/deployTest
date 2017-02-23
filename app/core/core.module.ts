import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

//Services
import { FirebaseConfigService } from './service/firebase-config.service';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    imports: [],
    declarations: [],
    exports: [
        BrowserModule,
        FormsModule
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error("CoreModule exists already. Only import in the root/app module");
        }
    }
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [FirebaseConfigService]
        };
    }

}