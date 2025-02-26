import { Injectable, OnInit, signal } from '@angular/core';
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authuser: any;
  userState: any = signal(null);
  constructor(private readonly firebaseAuth: Auth) {
    this.authuser = getAuth();
    console.log(this.authuser);
    onAuthStateChanged(this.authuser, (user) => {
      if (user) {
        console.log('Sign In Success');
        this.userState.set(user);
      } else {
        // ...
        console.log('Sign Out Success');
        this.userState.set(null);
      }
      console.log(user);
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
  }
}
