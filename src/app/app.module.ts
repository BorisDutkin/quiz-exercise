import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../environments/environment';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production,
      autoPause: true,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
