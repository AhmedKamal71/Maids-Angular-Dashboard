import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  } = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(+userId).subscribe((data) => {
        this.user = data.data;
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
