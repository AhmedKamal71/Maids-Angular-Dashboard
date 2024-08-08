import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  imports: [CommonModule],
})
export class UserDetailsComponent implements OnInit {
  user: any = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  };
  userNotFound = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.userService.getUserById(+userId).subscribe(
          (data) => {
            if (data && data.data) {
              this.user = data.data;
              this.userNotFound = false;
            } else {
              this.userNotFound = true;
            }
          },
          () => {
            this.userNotFound = true;
          }
        );
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
