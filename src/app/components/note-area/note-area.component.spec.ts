import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteAreaComponent } from './note-area.component';

describe('NoteAreaComponent', () => {
  let component: NoteAreaComponent;
  let fixture: ComponentFixture<NoteAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
