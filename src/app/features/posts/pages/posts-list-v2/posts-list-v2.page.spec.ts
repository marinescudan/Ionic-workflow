import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsListV2Page } from './posts-list-v2.page';

describe('PostsListV2Page', () => {
  let component: PostsListV2Page;
  let fixture: ComponentFixture<PostsListV2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListV2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
