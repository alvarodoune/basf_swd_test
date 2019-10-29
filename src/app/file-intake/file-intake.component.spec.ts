import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileIntakeComponent } from './file-intake.component';

describe('FileIntakeComponent', () => {
  let component: FileIntakeComponent;
  let fixture: ComponentFixture<FileIntakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileIntakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
