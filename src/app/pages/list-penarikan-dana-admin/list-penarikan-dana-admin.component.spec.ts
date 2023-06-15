import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPenarikanDanaAdminComponent } from './list-penarikan-dana-admin.component';

describe('ListPenarikanDanaAdminComponent', () => {
  let component: ListPenarikanDanaAdminComponent;
  let fixture: ComponentFixture<ListPenarikanDanaAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPenarikanDanaAdminComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPenarikanDanaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
