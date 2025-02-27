import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  docData,
  collectionData,
  orderBy,
  limit,
  query,
  where,
} from '@angular/fire/firestore';
import { Listing } from './listing.inferface'; // Create an interface for type safety
import { v4 as uuidv4 } from 'uuid'; // Import uuid library
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root', // or 'any', depending on your needs
})
export class ListingService {
  private firestore: Firestore = inject(Firestore);
  private listingsCollection = collection(this.firestore, 'listings'); // Firestore collection name

  async createListing(
    listingData: Omit<
      Listing,
      'uuid' | 'listingDatePosted' | 'listingDataLastUpdated'
    >
  ): Promise<string> {
    try {
      const uuid = uuidv4(); // Generate UUID
      const now = serverTimestamp(); // Use server timestamp for dates

      const listing: Listing = {
        uuid,
        ...listingData,
        listingDatePosted: now,
        listingDataLastUpdated: now,
      };

      const docRef = await addDoc(this.listingsCollection, listing);
      console.log('Document written with ID: ', docRef.id);
      return uuid; // Return the UUID
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e; // Re-throw the error for handling in the component
    }
  }

  async updateListing(
    uuid: string,
    updatedListingData: Omit<
      Listing,
      'uuid' | 'listingDatePosted' | 'listingDataLastUpdated'
    >
  ): Promise<void> {
    try {
      const now = serverTimestamp();

      const listingRef = doc(this.firestore, 'listings', uuid); // Use UUID to find the doc, not the auto-generated ID

      const updatedData: Partial<Listing> = {
        ...updatedListingData, // Include updated fields
        listingDataLastUpdated: now, // Update last updated timestamp
      };

      await updateDoc(listingRef, updatedData);
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document: ', error);
      throw error; // Re-throw for handling in the component
    }
  }

  get10RecentListings(): Observable<Listing[]> {
    try {
      console.log('GETTING LISTINGS....');
      const q = query(
        this.listingsCollection,
        orderBy('listingDatePosted', 'desc'), // Order by date posted, most recent first
        limit(3) // Limit to 10 results
      );

      return collectionData(q, { idField: 'uuid' }) as Observable<Listing[]>; // Return as Observable<Listing[]>
    } catch (error) {
      console.error('Error fetching recent listings:', error);
      throw error; // Re-throw the error for handling in the component
    }
  }

  getListingByUUID(uuid: string): Observable<Listing | undefined> {
    try {
      const listingRef = doc(this.firestore, 'listings', uuid);
      return docData(listingRef, { idField: 'uuid' }) as Observable<
        Listing | undefined
      >;
    } catch (error) {
      console.error('Error fetching listing by UUID:', error);
      return of(undefined); // Return an observable of undefined in case of error
    }
  }

  getListingsByPosterId(posterId: string): Observable<Listing[]> {
    try {
      const q = query(
        this.listingsCollection,
        where('listingPosterID', '==', posterId), // Filter by poster ID
        orderBy('listingDatePosted', 'desc') // Optional: Order by date
      );
      return collectionData(q, { idField: 'uuid' }) as Observable<Listing[]>;
    } catch (error) {
      console.error('Error fetching listings by poster ID:', error);
      return of([]); // Return empty observable to prevent errors
    }
  }
}
