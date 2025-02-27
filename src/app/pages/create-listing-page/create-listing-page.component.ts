import { Component } from '@angular/core';
import { AddlistingComponent } from '../../components/listings/addlisting/addlisting.component';

@Component({
  selector: 'app-create-listing-page',
  imports: [AddlistingComponent],
  templateUrl: './create-listing-page.component.html',
  styleUrl: './create-listing-page.component.css',
})
export class CreateListingPageComponent {}
