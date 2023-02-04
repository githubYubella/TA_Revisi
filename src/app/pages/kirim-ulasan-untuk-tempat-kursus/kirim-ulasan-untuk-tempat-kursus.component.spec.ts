import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KirimUlasanUntukTempatKursusComponent } from './kirim-ulasan-untuk-tempat-kursus.component';

describe('KirimUlasanUntukTempatKursusComponent', () => {
  let component: KirimUlasanUntukTempatKursusComponent;
  let fixture: ComponentFixture<KirimUlasanUntukTempatKursusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KirimUlasanUntukTempatKursusComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KirimUlasanUntukTempatKursusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
