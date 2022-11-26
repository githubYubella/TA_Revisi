import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterGuruPrivatComponent } from './register-guru-privat.component';

describe('RegisterGuruPrivatComponent', () => {
  let component: RegisterGuruPrivatComponent;
  let fixture: ComponentFixture<RegisterGuruPrivatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterGuruPrivatComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterGuruPrivatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
