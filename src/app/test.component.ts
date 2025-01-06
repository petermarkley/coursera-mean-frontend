import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-simple-test',
  template: '<h1>Test Works!</h1>',
})
export class SimpleTestComponent {
  constructor() {
    console.log('SimpleTestComponent is active');
  }
}

