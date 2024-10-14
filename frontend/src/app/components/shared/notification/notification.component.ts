import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'success';
  @Input() message: string = '';
  @Input() duration: number = 5000;

  isVisible: boolean = false;

  ngOnInit() {
    this.showNotification();
  }

  showNotification() {
    this.isVisible = true;
    setTimeout(() => {
      this.hideNotification();
    }, this.duration);
  }

  hideNotification() {
    this.isVisible = false;
    setTimeout(() => {
      this.message = '';
    }, 1000);
  }
}
