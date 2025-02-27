import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkmodeService } from '../../services/darkmode/darkmode.service';
import { AuthService } from '../../services/auth/auth.service';
import { NavbarprofilepicdropdownComponent } from './navbarprofilepicdropdown/navbarprofilepicdropdown.component';
import { StripeButtonComponent } from '../payment/stripe-button/stripe-button.component';
import { RouterLink } from '@angular/router';
import { getAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    NavbarprofilepicdropdownComponent,
    StripeButtonComponent,
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  darkModeService = inject(DarkmodeService);
  authService = inject(AuthService);
  auth = getAuth();

  darkModeToggled = this.darkModeService.DARK_TOGGLE();

  darkModeToggleClickHandler() {
    this.darkModeService.toggleDarkModeChange();
  }
  loginClickHandler() {
    this.authService.googleLogin();
  }
  signOutClickHandler() {
    this.authService.signOut();
  }
}
