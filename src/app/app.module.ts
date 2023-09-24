import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SpellListComponent } from './pages/spell-list/spell-list.component';
import { Dnd5eApiService } from './services/dnd5e-api.service';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { BestiaryComponent } from './pages/bestiary/bestiary.component';

@NgModule({
  declarations: [
    AppComponent,
    SpellListComponent,
    HeaderComponent,
    HomeComponent,
    BestiaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [Dnd5eApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
