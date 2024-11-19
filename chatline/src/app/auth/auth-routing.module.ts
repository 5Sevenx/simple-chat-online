import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AppearanceComponent } from '../main/appearance/appearance.component';
import { ProfileComponent } from '../main/profile/profile.component';


const routes: Routes = [
  { path: '', component: AuthPageComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
