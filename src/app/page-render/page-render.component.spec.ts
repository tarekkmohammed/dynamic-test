import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRenderComponent } from './page-render.component';

describe('PageRenderComponent', () => {
  let component: PageRenderComponent;
  let fixture: ComponentFixture<PageRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
