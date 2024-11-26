import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: ``
})
export class SideBarComponent implements OnInit {
  public sidebaritems = [
    { label: 'Main', icon: 'assets/img/svg/home-button-green-icon.svg', url: 'chat' },
    { label: 'Appearance', icon: 'assets/img/svg/appearance.svg', url: 'appearance' },
  ];

  userImageUrl: string = '';  // To store the user's avatar URL

  constructor(private service: MainServiceService) {}

  ngOnInit(): void {
    this.loadUserAvatar();
  }

  //To load img 
  loadUserAvatar(): void {
    const user = this.service.getCurrentUser();
    if (user && user.id !== undefined) {
      this.service.getAvatarUrl(user.id).subscribe(
        (url: string) => {
          this.userImageUrl = url;
        },
        (error) => {
          console.error('Error fetching avatar URL:', error);
        }
      );
    }
  }
}
