import { Component, inject } from '@angular/core';
import { ListingService } from '../../../services/listing/listing.service';
import { StorageService } from '../../../services/storage/storage.service';
import { getAuth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-addlisting',
  imports: [FormsModule],
  templateUrl: './addlisting.component.html',
  styleUrl: './addlisting.component.css',
})
export class AddlistingComponent {
  listingService = inject(ListingService);
  storageService = inject(StorageService);
  selectedFile: File | null = null;
  uploadProgress: number | undefined;
  downloadURL: string | undefined;
  listingTitle: string = '';
  listingDescription: string = '';
  listingPosterName: string = '';
  listingPostalCode: string = '';

  async createNewListing(newListingData: any) {
    try {
      const photoURL = await this.uploadPhoto();

      if (photoURL) {
        newListingData.listingImageUrl = photoURL ?? null;

        const uuid = await this.listingService.createListing(newListingData);
        console.log('New listing created with UUID:', uuid);
      } else {
        console.log('photo upload failed, please provide valid photo');
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      // ... display an error message to the user
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async uploadPhoto() {
    if (this.selectedFile) {
      const filePath = `${getAuth().currentUser?.uid}/${
        this.selectedFile.name
      }`; // Define your storage path
      return await this.storageService.uploadFile(this.selectedFile, filePath);
    }
  }

  formValidator(): boolean {
    return true;
  }

  onSubmitNewListing() {
    let newListingData = {
      listingTitle: this.listingTitle,
      listingDescription: this.listingDescription,
      listingImageUrl: '',
      listingPosterName: this.listingPosterName,
      listingPosterID: getAuth().currentUser?.uid ?? null,
      listingPostalCode: this.listingPostalCode,
      // ... other data
    };
    console.log(newListingData);
    //perform validation
    if (
      this.selectedFile != null &&
      newListingData.listingPosterID == getAuth().currentUser?.uid
    ) {
      this.createNewListing(newListingData);
    }
  }
}
