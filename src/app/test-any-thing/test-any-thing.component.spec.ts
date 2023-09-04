import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAnyThingComponent } from './test-any-thing.component';

describe('TestAnyThingComponent', () => {
  let component: TestAnyThingComponent;
  let fixture: ComponentFixture<TestAnyThingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAnyThingComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAnyThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
