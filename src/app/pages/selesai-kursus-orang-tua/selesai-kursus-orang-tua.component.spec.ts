import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelesaiKursusOrangTuaComponent } from './selesai-kursus-orang-tua.component';

describe('SelesaiKursusOrangTuaComponent', () => {
  let component: SelesaiKursusOrangTuaComponent;
  let fixture: ComponentFixture<SelesaiKursusOrangTuaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelesaiKursusOrangTuaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelesaiKursusOrangTuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
