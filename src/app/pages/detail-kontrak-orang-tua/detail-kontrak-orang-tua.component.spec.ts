import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailKontrakOrangTuaComponent } from './detail-kontrak-orang-tua.component';

describe('DetailKontrakOrangTuaComponent', () => {
  let component: DetailKontrakOrangTuaComponent;
  let fixture: ComponentFixture<DetailKontrakOrangTuaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailKontrakOrangTuaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailKontrakOrangTuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
