import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SideBarComponent } from './main/side-bar/side-bar.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AppearanceComponent } from './main/appearance/appearance.component';
import { ProfileComponent } from './main/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SideBarComponent,
    AppearanceComponent,
    ProfileComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
