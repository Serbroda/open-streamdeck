import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeckComponent } from './components/deck/deck.component';
import { DeckItemComponent } from './components/deck-item/deck-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckComponent,
    DeckItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
