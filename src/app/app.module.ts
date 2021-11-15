import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { registerLocaleData } from '@angular/common';

// INTERCEPTORS
// HE IMPLEMENTADO UNOS INTERCEPTORES DE LAS LLAMADAS PARA ENVÍO DE HEADERS Y ERRORES. NO LO HE DESARROLLADO MÁS PORQUE EN ESTA
// PRUEBA NO APLICAN
import { httpInterceptorProviders } from '@app/interceptors/';

// MATERIAL
import { MaterialModule } from '@app/modules/material.module';

// ANIMATIONS
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// LANGUAGE
import localeEs from '@angular/common/locales/es';



registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders,
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
  {
    provide: LOCALE_ID,
    useValue: 'es'
  }
  
],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
