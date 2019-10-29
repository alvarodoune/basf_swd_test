import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatehomeComponent } from './privatehome.component';

describe('PrivatehomeComponent', () => {
  let component: PrivatehomeComponent;
  let fixture: ComponentFixture<PrivatehomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatehomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
