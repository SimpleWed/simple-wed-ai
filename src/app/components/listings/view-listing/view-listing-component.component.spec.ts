import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListingComponentComponent } from './view-listing-component.component';

describe('ViewListingComponentComponent', () => {
  let component: ViewListingComponentComponent;
  let fixture: ComponentFixture<ViewListingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewListingComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewListingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
