import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../services/company/company.service';
import { JobService } from '../../../../services/job/job.service';
import { JobSeekerService } from '../../../../services/jobseeker/jobseeker.service';
import { forkJoin } from 'rxjs';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { CompanyResponse } from '../../../../interfaces/company';
import { JobResponse } from '../../../../interfaces/job';
import { JobSeekerResponse } from '../../../../interfaces/jobseeker';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalCompanies: number = 0;
  totalJobs: number = 0;
  totalJobseekers: number = 0;
  totalUsers: number = 0; 
  dataLoaded: boolean = false;

  constructor(
    private companyService: CompanyService,
    private jobService: JobService,
    private jobSeekerService: JobSeekerService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    forkJoin({
      companies: this.companyService.getCompaniesCount(),
      jobs: this.jobService.getJobsCount(),
      jobseekers: this.jobSeekerService.getJobSeekersCount()
    }).subscribe({
      next: (results: { companies: CompanyResponse; jobs: JobResponse; jobseekers: JobSeekerResponse }) => {
        console.log('Raw results:', results);
  
        this.totalCompanies = results.companies.companies.length;
  
        this.totalJobs = Array.isArray(results.jobs.totalJobs) ? results.jobs.totalJobs.length : 0;
  
        this.totalJobseekers = results.jobseekers.jobSeekers.length;
  
        this.totalUsers = this.totalCompanies + this.totalJobseekers;
  
        // console.log('Total Companies:', this.totalCompanies);
        // console.log('Total Jobs:', this.totalJobs);
        // console.log('Total Jobseekers:', this.totalJobseekers);
  
        this.dataLoaded = true;
        this.initializeCharts();
      },
      error: (error) => {
        console.error('Error fetching dashboard data:', error);
        this.dataLoaded = false;
      }
    });
  }
  initializeCharts(): void {
    if (!this.dataLoaded) {
      console.warn('Attempting to initialize charts before data is loaded');
      return;
    }

    const barChartCtx = document.getElementById('jobseekersBarChart') as HTMLCanvasElement;
    if (barChartCtx) {
      const jobFieldData = {
        labels: ['Engineering', 'IT', 'Healthcare', 'Sales', 'Education'],
        data: [0, 8, 3, 2, 7]
      };

      new Chart(barChartCtx, {
        type: 'bar',
        data: {
          labels: jobFieldData.labels,
          datasets: [{
            label: 'Job Seekers',
            data: jobFieldData.data,
            backgroundColor: ['#b0b0b0', '#ff0000', '#111827'],
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    const lineChartCtx = document.getElementById('jobsLineChart') as HTMLCanvasElement;
    if (lineChartCtx) {
      const jobTrendsData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        data: [5, 15, 25, 35, 45]
      };

      new Chart(lineChartCtx, {
        type: 'line',
        data: {
          labels: jobTrendsData.labels,
          datasets: [{
            label: 'Jobs Posted',
            data: jobTrendsData.data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: '#3498db',
            fill: true
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
