import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiwayatTransaksiOrangTuaComponent } from './riwayat-transaksi-orang-tua.component';

describe('RiwayatTransaksiOrangTuaComponent', () => {
  let component: RiwayatTransaksiOrangTuaComponent;
  let fixture: ComponentFixture<RiwayatTransaksiOrangTuaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RiwayatTransaksiOrangTuaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiwayatTransaksiOrangTuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
