import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router:Router) {
        // Add the logout item conditionally based on the authentication status
        if (this.authService.isLoggedIn()) {
          this.menuItems.push({ label: 'Logout', icon: 'logout', action: 'logout' });
        }
   }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logout();
  }

  menuItems = [
    { label: 'Home', icon: 'home', action: 'home' },
    { label: 'Profile', icon: 'person', action: 'profile' },
    { label: 'Contact', icon: 'contact_mail', action: 'contact' },
  ];

  handleMenuClick(action: string) {
    if (action === 'logout') {
      this.logOut();
      this.router.navigate(['/signIn']);
    } else {
      // Handle other actions (e.g., navigation)
      console.log('Menu action:', action);
    }
  }
}
