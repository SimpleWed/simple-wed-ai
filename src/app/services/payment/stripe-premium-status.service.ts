import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth } from '@angular/fire/auth';
import {
  collection,
  Firestore,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class StripePremiumStatusService {
  private firestore: Firestore = inject(Firestore);
  constructor() {}

  async getActiveSubscriptionBOOL() {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('User not logged in');

    const db = this.firestore;
    const subscriptionsRef = collection(
      db,
      'customers',
      userId,
      'subscriptions'
    );
    const q = query(
      subscriptionsRef,
      where('status', 'in', ['trialing', 'active'])
    );

    return new Promise<boolean>((resolve, reject) => {
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          // In this implementation we only expect one active or trialing subscription to exist.
          if (snapshot.docs.length === 0) {
            console.log('No active or trialing subscriptions found');
            resolve(false);
          } else {
            console.log('Active or trialing subscription found');
            resolve(true);
          }
          unsubscribe();
        },
        reject
      );
    });
  }
}
