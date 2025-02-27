import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
@Component({
  selector: 'app-navbarprofilepicdropdown',
  imports: [],
  templateUrl: './navbarprofilepicdropdown.component.html',
  styleUrl: './navbarprofilepicdropdown.component.css',
})
export class NavbarprofilepicdropdownComponent {
  authService = inject(AuthService);
}
