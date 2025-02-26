import { Component } from '@angular/core';
import { AddlistingComponent } from '../../components/listings/addlisting/addlisting.component';
import { AlllistingsComponent } from '../../components/listings/alllistings/alllistings.component';

@Component({
  selector: 'app-home',
  imports: [AddlistingComponent, AlllistingsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
