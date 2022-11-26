import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiwayatTransaksiGuruPrivatComponent } from './riwayat-transaksi-guru-privat.component';

describe('RiwayatTransaksiGuruPrivatComponent', () => {
  let component: RiwayatTransaksiGuruPrivatComponent;
  let fixture: ComponentFixture<RiwayatTransaksiGuruPrivatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RiwayatTransaksiGuruPrivatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiwayatTransaksiGuruPrivatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
