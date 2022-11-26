import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PengaturanTempatKursusComponent } from './pengaturan-tempat-kursus.component';

describe('PengaturanTempatKursusComponent', () => {
  let component: PengaturanTempatKursusComponent;
  let fixture: ComponentFixture<PengaturanTempatKursusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PengaturanTempatKursusComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PengaturanTempatKursusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
