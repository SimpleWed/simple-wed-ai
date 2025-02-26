import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbarprofilepicdropdown',
  imports: [],
  templateUrl: './navbarprofilepicdropdown.component.html',
  styleUrl: './navbarprofilepicdropdown.component.css',
})
export class NavbarprofilepicdropdownComponent {
  @Input() photoURL = '';
}
