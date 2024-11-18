import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ProfileComponent } from './profile/profile.component';
import { AppearanceComponent } from './appearance/appearance.component';

export const routes: Routes = [{
  path:'',
  component: MainComponent,
  children: [{
    path:'profile', component: ProfileComponent
  },{path:'appearance', component: AppearanceComponent},{
    
  }]
},]


export class MainRoute{}
