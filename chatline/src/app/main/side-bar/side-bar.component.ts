import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: ``
})
export class SideBarComponent {

  public sidebaritems = [
    { label: 'Main', icon: 'assets/img/svg/home-button-green-icon.svg', url: 'chat' },
    { label: 'Appearance', icon: 'assets/img/svg/appearance.svg', url: 'appearance' },
  ];

}
