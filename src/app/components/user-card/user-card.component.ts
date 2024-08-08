import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HoverAnimationDirective } from '../../directives/hover-animation.directive';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, HoverAnimationDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input() user: any;
  constructor(public router: Router) {}
  viewUser(userId: number) {
    this.router.navigate(['/user', userId]);
  }
}
