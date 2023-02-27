import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesertsComponent } from './deserts.component';

describe('DesertsComponent', () => {
  let component: DesertsComponent;
  let fixture: ComponentFixture<DesertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
