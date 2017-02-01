/**
 * Created by Isaiah on 2017-01-31.
 */
// Modules
import { NgModule } from '@angular/core';

// Components
import {MapComponent} from "./map.component";
import {MenuComponent} from "../menu/menu.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";

// Services

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