import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  onSnapshot,
} from '@angular/fire/firestore';
import { getFunctions, httpsCallable } from '@angular/fire/functions';
@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private firestore: Firestore = inject(Firestore);
  private firebaseApp: FirebaseApp = inject(FirebaseApp);
  constructor() {}
  async getCheckoutUrl(priceId: string): Promise<string> {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('User is not authenticated');

    const db = this.firestore;
    const checkoutSessionRef = collection(
      db,
      'customers',
      userId,
      'checkout_sessions'
    );

    const docRef = await addDoc(checkoutSessionRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    return new Promise<string>((resolve, reject) => {
      const unsubscribe = onSnapshot(docRef, (snap) => {
        const { error, url } = snap.data() as {
          error?: { message: string };
          url?: string;
        };
        if (error) {
          unsubscribe();
          reject(new Error(`An error occurred: ${error.message}`));
        }
        if (url) {
          console.log('Stripe Checkout URL:', url);
          unsubscribe();
          resolve(url);
        }
      });
    });
  }

  async getPortalUrl(): Promise<string> {
    const auth = getAuth();
    const user = auth.currentUser;

    let dataWithUrl: any;
    try {
      const functions = getFunctions(this.firebaseApp, 'us-central1');
      const functionRef = httpsCallable(
        functions,
        'ext-firestore-stripe-payments-createPortalLink'
      );
      const { data } = await functionRef({
        customerId: user?.uid,
        returnUrl: window.location.origin,
      });

      // Add a type to the data
      dataWithUrl = data as { url: string };
      console.log('Reroute to Stripe portal: ', dataWithUrl.url);
    } catch (error) {
      console.error(error);
    }

    return new Promise<string>((resolve, reject) => {
      if (dataWithUrl.url) {
        resolve(dataWithUrl.url);
      } else {
        reject(new Error('No url returned'));
      }
    });
  }
}
