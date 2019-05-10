
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsbcNavComponent } from './csbc-nav.component';

describe('CsbcNavComponent', () => {
  let component: CsbcNavComponent;
  let fixture: ComponentFixture<CsbcNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CsbcNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsbcNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
