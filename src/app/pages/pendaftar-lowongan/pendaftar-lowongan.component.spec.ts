import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PendaftarLowonganComponent } from './pendaftar-lowongan.component';

describe('PendaftarLowonganComponent', () => {
  let component: PendaftarLowonganComponent;
  let fixture: ComponentFixture<PendaftarLowonganComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PendaftarLowonganComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PendaftarLowonganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
