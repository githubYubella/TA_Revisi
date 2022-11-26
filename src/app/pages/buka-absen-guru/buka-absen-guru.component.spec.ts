import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BukaAbsenGuruComponent } from './buka-absen-guru.component';

describe('BukaAbsenGuruComponent', () => {
  let component: BukaAbsenGuruComponent;
  let fixture: ComponentFixture<BukaAbsenGuruComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BukaAbsenGuruComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BukaAbsenGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
