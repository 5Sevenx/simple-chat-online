import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ProfileComponent } from './profile/profile.component';
import { AppearanceComponent } from './appearance/appearance.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'appearance', component: AppearanceComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
