import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAbsenGuruComponent } from './edit-absen-guru.component';

describe('EditAbsenGuruComponent', () => {
  let component: EditAbsenGuruComponent;
  let fixture: ComponentFixture<EditAbsenGuruComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAbsenGuruComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAbsenGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
