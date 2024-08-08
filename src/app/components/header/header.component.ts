import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchValue: string = '';
  private searchSubject = new Subject<string>();

  constructor(public router: Router) {}

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(300)) // Debounce time to limit frequent navigation
      .subscribe((userId) => {
        if (userId) {
          this.router.navigate([`/user/${userId}`]);
        } else {
          this.router.navigate(['/']);
        }
      });
  }

  onSearchChange() {
    this.searchSubject.next(this.searchValue.trim());
  }
}
