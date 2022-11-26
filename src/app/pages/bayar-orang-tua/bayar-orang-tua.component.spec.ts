import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BayarOrangTuaComponent } from './bayar-orang-tua.component';

describe('BayarOrangTuaComponent', () => {
  let component: BayarOrangTuaComponent;
  let fixture: ComponentFixture<BayarOrangTuaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BayarOrangTuaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BayarOrangTuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
