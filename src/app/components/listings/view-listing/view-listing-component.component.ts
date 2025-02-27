import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../../../services/listing/listing.service';
@Component({
  selector: 'app-view-listing-component',
  imports: [],
  templateUrl: './view-listing-component.component.html',
  styleUrl: './view-listing-component.component.css',
})
export class ViewListingComponent implements OnInit, OnDestroy {
  activatedRoute = inject(ActivatedRoute);
  listingService = inject(ListingService);
  listingId: any = '';
  listingData: any = null;
  listingData$: any = null;
  ngOnInit(): void {
    this.getListingDataByID();
  }

  getListingDataByID() {
    this.listingId = this.activatedRoute.snapshot.paramMap.get('id');
    this.listingData$ = this.listingService
      .getListingByUUID(this.listingId)
      .subscribe((data) => {
        this.listingData = data;
      });
  }

  ngOnDestroy(): void {
    if (this.listingData$ != null) {
      console.log('listing unmount');
      this.listingData$.unsubscribe();
    }
  }
}
