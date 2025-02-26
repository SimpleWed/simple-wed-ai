import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkmodeService } from '../../services/darkmode/darkmode.service';
import { AuthService } from '../../services/auth/auth.service';
import { getAuth } from 'firebase/auth';
import { NavbarprofilepicdropdownComponent } from '../navbarprofilepicdropdown/navbarprofilepicdropdown.component';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, NavbarprofilepicdropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  darkModeService = inject(DarkmodeService);
  authService = inject(AuthService);
  darkModeToggled = this.darkModeService.DARK_TOGGLE();
  ngOnInit(): void {
    console.log(this.authService.userState());
  }

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
