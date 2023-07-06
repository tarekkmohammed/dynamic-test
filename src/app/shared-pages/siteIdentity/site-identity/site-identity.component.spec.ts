import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteIdentityComponent } from './site-identity.component';

describe('SiteIdentityComponent', () => {
  let component: SiteIdentityComponent;
  let fixture: ComponentFixture<SiteIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteIdentityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
