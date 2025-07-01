import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';

import { HomeComponent } from './components/shared/home/home.component';
import { AboutComponent } from './components/shared/about/about.component';
import { FaqComponent } from './components/shared/faq/faq.component';
import { BlogComponent } from './components/shared/blog/blog.component';
import { BlogDetailsComponent } from './components/shared/blog-details/blog-details.component';
import { ContactUsComponent } from './components/shared/contact-us/contact-us.component';
import { GetStartedComponent } from './components/auth/get-started/get-started.component';
import { RegisterJobseekerComponent } from './components/auth/register-jobseeker/register-jobseeker.component';
import { RegisterEmployerComponent } from './components/auth/register-employer/register-employer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { AdminComponent } from './components/core/admin/admin.component';
import { RoleGuard } from './guards/role/role.guard';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { CompanyComponent } from './components/core/company/company.component';
import { AdminDashboardComponent } from './components/core/admin/admin-dashboard/admin-dashboard.component';
import { AdminJobsComponent } from './components/core/admin/admin-jobs/admin-jobs.component';
import { AdminJobseekersComponent } from './components/core/admin/admin-jobseekers/admin-jobseekers.component';
import { AdminJobfieldsComponent } from './components/core/admin/admin-jobfields/admin-jobfields.component';
import { AdminCompanyComponent } from './components/core/admin/admin-company/admin-company.component';
import { CompanyProfileComponent } from './components/core/company/company-profile/company-profile.component';
import { CompanyJobsComponent } from './components/core/company/company-jobs/company-jobs.component';
import { CompanyApplicationsComponent } from './components/core/company/company-applications/company-applications.component';
import { CompanySettingsComponent } from './components/core/company/company-settings/company-settings.component';
import { ProfileComponent } from './components/core/jobseeker/profile/profile.component';
import { ApplicationsComponent } from './components/core/jobseeker/applications/applications.component';
import { SettingsComponent } from './components/core/jobseeker/settings/settings.component';
import { JobsComponent } from './components/shared/jobs/jobs.component';
import { JobDetailsComponent } from './components/shared/job-details/job-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'blogs', component: BlogComponent },
  { path: 'blogs/:id', component: BlogDetailsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'get-started', component: GetStartedComponent },
  { path: 'register-jobseeker', component: RegisterJobseekerComponent },
  { path: 'register-employer', component: RegisterEmployerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs/:id', component: JobDetailsComponent },

  // ✅ Jobseeker dashboard routes
  {
    path: 'jobseeker',
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'JOBSEEKER' },
    children: [
      { path: '', redirectTo: 'settings', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'applications', component: ApplicationsComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },

  // ✅ Company dashboard routes
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'COMPANY' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: CompanyProfileComponent },
      { path: 'jobs', component: CompanyJobsComponent },
      { path: 'applications', component: CompanyApplicationsComponent },
      { path: 'profile', component: CompanyProfileComponent },
      { path: 'settings', component: CompanySettingsComponent },
    ],
  },

  // ✅ Admin dashboard routes
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'ADMIN' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'jobs', component: AdminJobsComponent },
      { path: 'jobseekers', component: AdminJobseekersComponent },
      { path: 'jobfields', component: AdminJobfieldsComponent },
      { path: 'company', component: AdminCompanyComponent },
    ],
  },

  // ✅ Legal pages (new)
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },

  // ✅ Catch-all for 404
  { path: '**', component: NotfoundComponent },
];

