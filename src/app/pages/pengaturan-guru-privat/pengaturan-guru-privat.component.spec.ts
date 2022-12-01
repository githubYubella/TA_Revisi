import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PengaturanGuruPrivatComponent } from './pengaturan-guru-privat.component';

describe('PengaturanGuruPrivatComponent', () => {
  let component: PengaturanGuruPrivatComponent;
  let fixture: ComponentFixture<PengaturanGuruPrivatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PengaturanGuruPrivatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PengaturanGuruPrivatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
