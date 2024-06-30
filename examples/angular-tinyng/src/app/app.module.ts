import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { TiTableModule } from '@opentiny/ng';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    TiTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
