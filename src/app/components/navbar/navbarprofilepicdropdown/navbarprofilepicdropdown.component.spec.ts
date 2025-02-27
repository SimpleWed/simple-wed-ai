import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarprofilepicdropdownComponent } from './navbarprofilepicdropdown.component';

describe('NavbarprofilepicdropdownComponent', () => {
  let component: NavbarprofilepicdropdownComponent;
  let fixture: ComponentFixture<NavbarprofilepicdropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarprofilepicdropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarprofilepicdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
