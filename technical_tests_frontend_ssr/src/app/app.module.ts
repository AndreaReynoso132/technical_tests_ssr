import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AbmModule } from './abm/abm.module';
import { itemReducer } from './states/item.reducer';
import { ItemEffects } from './states/item.effects';
import { authReducer } from './states/auth.reducer'; // Importar el reducer de autenticación
import { AuthEffects } from './states/auth.effects'; // Importar los efectos de autenticación
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './states/auth.service'; // Importar el servicio de autenticación

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    AbmModule,
    StoreModule.forRoot({ 
      items: itemReducer,
      auth: authReducer 
    }),
    EffectsModule.forRoot([
      ItemEffects,
      AuthEffects 
    ]),
    HttpClientModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    MatCardModule, 
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  providers: [AuthService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
