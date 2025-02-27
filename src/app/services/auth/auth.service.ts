import { inject, Injectable, OnInit, Signal, signal } from '@angular/core';
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { StripePremiumStatusService } from '../payment/stripe-premium-status.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router: Router = inject(Router);
  stripePremiumStatusService: StripePremiumStatusService = inject(
    StripePremiumStatusService
  );
  authuser: any;
  userState: any;
  isPremiumMember: any;
  constructor(private readonly firebaseAuth: Auth) {
    this.authuser = getAuth();
    this.userState = signal(null);
    this.isPremiumMember = signal(false);
    onAuthStateChanged(this.authuser, async (user) => {
      if (user) {
        console.log('Sign In Success');
        this.userState.set({ user });
        this.isPremiumMember.set(
          await this.stripePremiumStatusService.getActiveSubscriptionBOOL()
        );
      } else {
        this.userState.set(null);
        this.isPremiumMember.set(false);
      }
    });
  }

  //login
  async googleLogin(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.firebaseAuth, provider);
      const user = result.user;
      if (!user) {
        throw new Error('Google-Login error');
      }
    } catch (error) {
      console.error('Google-Login error:', error);
      throw error;
    }
  }

  //logout
  async signOut() {
    try {
      await this.firebaseAuth.signOut();
      console.info('Sign out success!');
    } catch (e) {
      console.error('Sign out failed!');
    }
    this.router.navigate(['/']);
  }
}
