import { Component, inject } from '@angular/core';
import { ListingService } from '../../../services/listing/listing.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-addlisting',
  imports: [],
  templateUrl: './addlisting.component.html',
  styleUrl: './addlisting.component.css',
})
export class AddlistingComponent {
  listingService = inject(ListingService);
  authService = inject(AuthService);

  async createNewListing() {
    const newListingData = {
      listingTitle: 'My Listing',
      listingDescription: 'This is a test listing.',
      listingImageUrl:
        'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      listingPosterName: 'John Doe',
      listingPosterID: this.authService.userState()?.user?.uid ?? null,
      listingPostalCode: 'L8W 1X4',
      // ... other data
    };

    try {
      const uuid = await this.listingService.createListing(newListingData);
      console.log('New listing created with UUID:', uuid);
    } catch (error) {
      console.error('Error creating listing:', error);
      // ... display an error message to the user
    }
  }
}
