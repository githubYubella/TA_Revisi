import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PengaturanOrangTuaComponent } from './pengaturan-orang-tua.component';

describe('PengaturanOrangTuaComponent', () => {
  let component: PengaturanOrangTuaComponent;
  let fixture: ComponentFixture<PengaturanOrangTuaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PengaturanOrangTuaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PengaturanOrangTuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
