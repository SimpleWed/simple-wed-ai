import { Component, inject, OnInit } from '@angular/core';
import { ListingService } from '../../../services/listing/listing.service';

@Component({
  selector: 'app-alllistings',
  imports: [],
  templateUrl: './alllistings.component.html',
  styleUrl: './alllistings.component.css',
})
export class AlllistingsComponent implements OnInit {
  listingService = inject(ListingService);
  listOfListings = [];

  ngOnInit(): void {
    this.get10MostRecentListings();
  }

  async get10MostRecentListings() {
    try {
      const allListings = await this.listingService
        .get10RecentListings()
        .subscribe((data: any) => {
          this.listOfListings = data;
        });
      console.log('FETCH DATA');
    } catch (error) {
      console.error('Error getting all listings:', error);
      // ... display an error message to the user
    }
  }
}
