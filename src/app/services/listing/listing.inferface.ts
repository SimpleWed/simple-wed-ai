export interface Listing {
  uuid: string;
  listingTitle: string;
  listingDescription: string;
  listingDatePosted: any; // Use 'any' or a Firestore timestamp type
  listingDataLastUpdated: any; // Use 'any' or a Firestore timestamp type
  listingImageUrl: string;
  listingPosterName: string;
  listingPosterID: string;
  listingPostalCode: string;
  // ... other properties
}
