/**
 * Created by Isaiah on 2017-01-31.
 */
// Modules
import { NgModule } from '@angular/core';

// Components
import {MapComponent} from "./map.component";
import {MenuComponent} from "../menu/menu.component";
import {AppModule} from "../app.module";
import {BrowserModule} from "@angular/platform-browser";

// Services

@NgModule({
    imports: [BrowserModule],
    declarations: [
        MapComponent,
        MenuComponent
    ],
    exports: [MapComponent],
    providers: [  ]
})
export class MapModule { }