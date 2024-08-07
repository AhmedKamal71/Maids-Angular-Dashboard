import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  currentPage = 1;
  totalUsers = 0;
  perPage = 10;
  totalPages = 0;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.currentPage).subscribe((data) => {
      console.log(data.data);
      this.users = data.data;
      this.totalUsers = data.total;
      this.totalPages = Math.ceil(this.totalUsers / this.perPage);
    });
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadUsers();
  }

  viewUser(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
