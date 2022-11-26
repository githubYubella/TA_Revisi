import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailLowonganDiterimaComponent } from './detail-lowongan-diterima.component';

describe('DetailLowonganDiterimaComponent', () => {
  let component: DetailLowonganDiterimaComponent;
  let fixture: ComponentFixture<DetailLowonganDiterimaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailLowonganDiterimaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailLowonganDiterimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
