import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CsbcHomeCenterComponent } from './csbc-home-center.component';

describe('CsbcHomeCenterComponent', () => {
  let component: CsbcHomeCenterComponent;
  let fixture: ComponentFixture<CsbcHomeCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsbcHomeCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsbcHomeCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
