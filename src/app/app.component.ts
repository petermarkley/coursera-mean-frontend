import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router, Routes } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
  <div class="flex flex-row justify-center p-6 relative">
    <router-outlet></router-outlet>
  </div>
  `,
  imports: [RouterModule],
  styles: []
})
export class AppComponent {
  title = 'client';
  constructor(private router: Router) {}
}

