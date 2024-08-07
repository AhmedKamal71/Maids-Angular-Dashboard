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
      .pipe(
        debounceTime(300) // Debounce time to limit frequent navigation
      )
      .subscribe((userId) => {
        // Enhanced logging and error handling
        if (userId) {
          console.log('Navigating to user with ID:', userId);
          this.router.navigate([`/user/${userId}`]).catch((err) => {
            console.error('Navigation error:', err);
          });
        } else {
          console.log('Navigating to home page');
          this.router.navigate(['/']).catch((err) => {
            console.error('Navigation error:', err);
          });
        }
      });
  }

  // Trigger search when input changes
  onSearchChange() {
    const trimmedValue = this.searchValue.trim();
    console.log('Triggering search with value:', trimmedValue);
    this.searchSubject.next(trimmedValue);
  }
}
