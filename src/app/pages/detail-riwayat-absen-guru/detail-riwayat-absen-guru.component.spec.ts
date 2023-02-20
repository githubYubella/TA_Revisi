import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailRiwayatAbsenGuruComponent } from './detail-riwayat-absen-guru.component';

describe('DetailRiwayatAbsenGuruComponent', () => {
  let component: DetailRiwayatAbsenGuruComponent;
  let fixture: ComponentFixture<DetailRiwayatAbsenGuruComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRiwayatAbsenGuruComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailRiwayatAbsenGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
