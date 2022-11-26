import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PresensiKursusPrivatComponent } from './presensi-kursus-privat.component';

describe('PresensiKursusPrivatComponent', () => {
  let component: PresensiKursusPrivatComponent;
  let fixture: ComponentFixture<PresensiKursusPrivatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PresensiKursusPrivatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PresensiKursusPrivatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
