import { Component, inject } from '@angular/core';
import { ListingService } from '../../../services/listing/listing.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-alllistings',
  imports: [RouterLink],
  templateUrl: './alllistings.component.html',
  styleUrl: './alllistings.component.css',
})
export class AlllistingsComponent {
  listingService = inject(ListingService);
  listOfListings = [];

  async get10MostRecentListings() {
    try {
      const allListings = await this.listingService
        .get10RecentListings()
        .subscribe((data: any) => {
          this.listOfListings = data;
        });
    } catch (error) {
      console.error('Error getting all listings:', error);
      // ... display an error message to the user
    }
  }
}
