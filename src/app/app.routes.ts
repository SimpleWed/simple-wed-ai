import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateListingPageComponent } from './pages/create-listing-page/create-listing-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'createListing', component: CreateListingPageComponent },
];
