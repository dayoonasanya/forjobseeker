import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '../../../../services/company/company.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.css']
})
export class CompanySettingsComponent implements OnInit {
  companyForm: FormGroup;
  isLoading: boolean = true;
  errorMessage: string = '';
  companyId: string | null = null;
  logoPreview: string | ArrayBuffer | null = null;
  cloudinaryUploadUrl: string = '';

  constructor(
    private companyService: CompanyService,
    private authService: AuthService,
    private router: Router
  ) {
    this.companyForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      website: new FormControl(''),
      country: new FormControl('', [Validators.required]),
      businessEmail: new FormControl('', [Validators.required, Validators.email]),
      licenseNumber: new FormControl('', [Validators.required]),
      about: new FormControl(''),
      logo: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.companyId = this.authService.getCompanyId();
    
    if (this.companyId) {
      this.fetchCompanyDetails(this.companyId);
    } else {
      this.isLoading = false;
      this.errorMessage = 'No company found. Please ensure you are logged in.';
    }
  }

  fetchCompanyDetails(companyId: string): void {
    this.companyService.getCompanyById(companyId).subscribe(
      (response) => {
        const company = response.company || response;
        this.companyForm.patchValue({
          name: company.name,
          website: company.website,
          country: company.country,
          businessEmail: company.businessEmail,
          licenseNumber: company.licenseNumber,
          about: company.about
        });
        this.logoPreview = company.logo;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error loading company profile. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  // Cloudinary Logo Upload
  onLogoChange(event: any): void {
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
          this.logoPreview = res.secure_url;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error('Error uploading to Cloudinary:', error);
          this.isLoading = false;
        });
    }
  }

  onSubmit(): void {
    if (this.companyForm.invalid || !this.companyId) {
      return;
    }

    const companyData = {
      name: this.companyForm.get('name')?.value,
      website: this.companyForm.get('website')?.value,
      country: this.companyForm.get('country')?.value,
      businessEmail: this.companyForm.get('businessEmail')?.value,
      licenseNumber: this.companyForm.get('licenseNumber')?.value,
      about: this.companyForm.get('about')?.value,
      logo: this.cloudinaryUploadUrl
    };

    this.companyService.updateCompanyProfile(this.companyId, companyData).subscribe(
      (response) => {
        alert('Company profile updated successfully.');
        this.router.navigate(['/company/dashboard']);
      },
      (error) => {
        console.error('Error updating company profile:', error);
        alert('Error updating company profile. Please try again.');
      }
    );
  }
}
