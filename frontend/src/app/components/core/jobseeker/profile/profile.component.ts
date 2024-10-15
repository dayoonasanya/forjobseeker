import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { JobSeekerService } from '../../../../services/jobseeker/jobseeker.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  jobSeekerForm: FormGroup;
  isLoading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  jobSeekerId: string | null = null;
  profileImagePreview: string | ArrayBuffer | null = null;
  cloudinaryUploadUrl: string = '';
  cloudinaryCvUploadUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private jobSeekerService: JobSeekerService,
    private authService: AuthService,
    private router: Router
  ) {
    this.jobSeekerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      maxQualification: ['', [Validators.required]],
      yearsOfExperience: ['', [Validators.required]],
      profileImage: [''],
      summary: [''],
      skills: [''],
      cv: [''], 
      twitterLink: [''],
      linkedinLink: [''],
      githubLink: [''],
      website: ['']
    });
  }

  ngOnInit(): void {
    this.jobSeekerId = localStorage.getItem('jobseeker-id');
    
    if (this.jobSeekerId) {
      this.loadJobSeekerDetails(this.jobSeekerId);
    } else {
      this.isLoading = false;
      this.errorMessage = 'No JobSeeker ID found. Please log in again.';
    }
  }

  loadJobSeekerDetails(jobSeekerId: string): void {
    this.jobSeekerService.getJobSeekerById(jobSeekerId).subscribe({
      next: (response) => {
        const jobSeeker = response.jobSeeker;
        console.log('Jobseeker details received:', jobSeeker);

        const patchData = {
          firstName: jobSeeker.firstName ?? '',
          lastName: jobSeeker.lastName ?? '',
          phone: jobSeeker.phone ?? '',
          maxQualification: jobSeeker.maxQualification ?? '',
          yearsOfExperience: jobSeeker.yearsOfExperience ?? '',
          summary: jobSeeker.summary ?? '',
          skills: jobSeeker.skills?.length ? jobSeeker.skills.join(', ') : '',
          cv: jobSeeker.cv ?? '',
          twitterLink: jobSeeker.twitterLink ?? '',
          linkedinLink: jobSeeker.linkedinLink ?? '',
          githubLink: jobSeeker.githubLink ?? '',
          website: jobSeeker.website ?? ''
        };

        this.jobSeekerForm.patchValue(patchData);
        this.profileImagePreview = jobSeeker.profileImage || '';
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading jobseeker details:', error);
        this.errorMessage = 'Failed to load jobseeker details.';
        this.isLoading = false;
      }
    });
  }

  onProfileImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.isLoading = true;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 't2gtalks');
      formData.append('cloud_name', 't2gtalks');

      fetch('https://api.cloudinary.com/v1_1/dtn9kzx2v/image/upload', {
        method: 'POST',
        body: formData
      })
        .then((res) => res.json())
        .then((res) => {
          this.cloudinaryUploadUrl = res.secure_url;
          this.profileImagePreview = res.secure_url;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error('Error uploading profile image:', error);
          this.isLoading = false;
        });
    }
  }

  onCvChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.isLoading = true;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 't2gtalks');
      formData.append('cloud_name', 't2gtalks');

      fetch('https://api.cloudinary.com/v1_1/dtn9kzx2v/raw/upload', {
        method: 'POST',
        body: formData
      })
        .then((res) => res.json())
        .then((res) => {
          this.cloudinaryCvUploadUrl = res.secure_url;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error('Error uploading CV:', error);
          this.isLoading = false;
        });
    }
  }

  onSubmit(): void {
    if (this.jobSeekerForm.invalid || !this.jobSeekerId) {
      return;
    }

    const jobSeekerData = {
      ...this.jobSeekerForm.value,
      profileImage: this.cloudinaryUploadUrl,
      cv: this.cloudinaryCvUploadUrl,
      skills: this.jobSeekerForm.value.skills.split(',').map((skill: string) => skill.trim())
    };

    this.jobSeekerService.updateJobSeekerProfile(this.jobSeekerId, jobSeekerData).subscribe(
      (response) => {
        this.successMessage = 'Profile updated successfully!';
        this.router.navigate(['/jobseeker/settings']);
      },
      (error) => {
        console.error('Error updating profile:', error);
        this.errorMessage = 'Failed to update the profile. Please try again.';
      }
    );
  }
}
