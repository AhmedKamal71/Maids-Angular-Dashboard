import { routes } from './../../app.routes';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public router: Router) {}
  search(e: any) {
    let userId = e.target.value.trim();
    if (userId) {
      this.router.navigate([`/user/${userId}`]);
      console.log(userId);
    } else {
      this.router.navigate(['/']);
    }
  }
}
