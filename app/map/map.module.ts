/**
 * Created by Isaiah on 2017-01-31.
 */
// Modules
import { NgModule } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";

// Components
import {MapComponent} from "./map.component";
import {MenuComponent} from "../menu/menu.component";


@NgModule({
    imports: [BrowserModule, AppRoutingModule],
    declarations: [
        MapComponent,
        MenuComponent
    ],
    exports: [MapComponent],
    providers: [  ]
})
export class MapModule { }