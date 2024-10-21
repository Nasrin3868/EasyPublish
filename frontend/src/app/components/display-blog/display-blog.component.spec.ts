import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBlogComponent } from './display-blog.component';

describe('DisplayBlogComponent', () => {
  let component: DisplayBlogComponent;
  let fixture: ComponentFixture<DisplayBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayBlogComponent]
    });
    fixture = TestBed.createComponent(DisplayBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
