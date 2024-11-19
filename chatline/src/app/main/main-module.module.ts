import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppearanceComponent } from './appearance/appearance.component';
import { MainComponent } from './main.component';
import { ProfileComponent } from './profile/profile.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [
    MainComponent,
    SideBarComponent,
    AppearanceComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule
  ],
  exports:[
    MainComponent
  ]
})
export class MainModule { }
