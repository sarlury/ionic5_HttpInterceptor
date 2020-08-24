import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaketPage } from './paket.page';

describe('PaketPage', () => {
  let component: PaketPage;
  let fixture: ComponentFixture<PaketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
