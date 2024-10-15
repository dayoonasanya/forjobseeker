import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { JobService } from '../../../../services/job/job.service';
import { JobFieldService } from '../../../../services/jobfield/jobfield.service';
import { Job, JobType } from '../../../../interfaces/job';
import { JobField } from '../../../../interfaces/jobfield';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-job-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-job-form.component.html',
  styleUrls: ['./company-job-form.component.css']
})
export class CompanyJobFormComponent implements OnInit {
  @Input() job: Job | null = null;
  @Input() isVisible: boolean = false;
  @Output() formClose = new EventEmitter<boolean>();

  jobForm!: FormGroup;
  jobFields: JobField[] = [];

  constructor(
    private jobService: JobService,
    private jobFieldService: JobFieldService
  ) {}

  ngOnInit(): void {
    this.loadJobFields();
    this.initializeForm();
  }

  loadJobFields(): void {
    this.jobFieldService.getAllJobFields().subscribe(
      (fields: JobField[]) => {
        this.jobFields = fields;
      },
      (error) => {
        console.error('Error fetching job fields:', error);
      }
    );
  }

  initializeForm(): void {
    this.jobForm = new FormGroup({
      title: new FormControl(this.job?.title || '', [Validators.required]),
      type: new FormControl(this.job?.type || JobType.FULL_TIME, [Validators.required]),
      vacancies: new FormControl(this.job?.vacancies || 1, [Validators.required]),
      yearsOfExperience: new FormControl(this.job?.yearsOfExperience || '', [Validators.required]),
      description: new FormControl(this.job?.description || '', [Validators.required]),
      salaryRange: new FormControl(this.job?.salaryRange || ''),
      deadline: new FormControl(this.job?.deadline || '', [Validators.required]),
      jobFieldId: new FormControl(this.job?.jobFieldId || '', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.jobForm.invalid) {
      console.log('Form is invalid:', this.jobForm.errors);
      return;
    }

    const jobData = this.jobForm.value;
    const companyId = localStorage.getItem('company-id');

    if (!companyId) {
      console.error('Company ID not found in local storage');
      alert('Error: Company ID not found. Please log in again.');
      return;
    }

    jobData.companyId = companyId;
    console.log('Job data to be sent:', jobData);

    if (this.job) {
      this.jobService.updateJob(this.job.id, jobData).subscribe(
        (response) => {
          console.log('Job updated successfully:', response);
          alert('Job updated successfully!');
          this.formClose.emit(true);
        },
        (error) => {
          console.error('Error updating job:', error);
          alert('Error updating job. Please try again.');
        }
      );
    } else {
      this.jobService.createJob(jobData).subscribe(
        (response) => {
          console.log('Job created successfully:', response);
          alert('Job created successfully!');
          this.formClose.emit(true);
        },
        (error) => {
          console.error('Error creating job:', error);
          alert('Error creating job. Please try again.');
        }
      );
    }
  }

  closeForm(): void {
    this.formClose.emit(false);
  }
}