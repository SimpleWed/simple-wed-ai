import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateListingPageComponent } from './pages/listings/create-listing-page/create-listing-page.component';
import { ViewListingPageComponent } from './pages/listings/view-listing-page/view-listing-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'createListing', component: CreateListingPageComponent },
  { path: 'viewListing/:id', component: ViewListingPageComponent },
];
