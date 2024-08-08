import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchValue: string = '';
  private searchSubject = new Subject<string>();
  isLoading$ = this.loadingService.loading$;

  constructor(public router: Router, private loadingService: LoadingService) {}

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(300)).subscribe((userId) => {
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
