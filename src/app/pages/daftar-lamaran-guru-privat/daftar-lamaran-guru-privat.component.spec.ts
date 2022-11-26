import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DaftarLamaranGuruPrivatComponent } from './daftar-lamaran-guru-privat.component';

describe('DaftarLamaranGuruPrivatComponent', () => {
  let component: DaftarLamaranGuruPrivatComponent;
  let fixture: ComponentFixture<DaftarLamaranGuruPrivatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftarLamaranGuruPrivatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DaftarLamaranGuruPrivatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
