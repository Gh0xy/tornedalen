import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyToPostComponent } from './reply-to-post.component';

describe('ReplyToPostComponent', () => {
  let component: ReplyToPostComponent;
  let fixture: ComponentFixture<ReplyToPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyToPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplyToPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
