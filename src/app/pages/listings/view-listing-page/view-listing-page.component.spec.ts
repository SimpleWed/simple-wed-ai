import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListingPageComponent } from './view-listing-page.component';

describe('ViewListingPageComponent', () => {
  let component: ViewListingPageComponent;
  let fixture: ComponentFixture<ViewListingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewListingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
