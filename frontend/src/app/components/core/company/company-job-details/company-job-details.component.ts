import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../../../interfaces/job';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-company-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './company-job-details.component.html',
  styleUrl: './company-job-details.component.css'
})
export class CompanyJobDetailsComponent implements OnInit {
  @Input() job: Job | null = null;
  @Input() isVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  closeOverlay() {
    this.isVisible = false;
  }
}
