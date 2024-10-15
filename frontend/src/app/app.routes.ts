import { Routes } from '@angular/router';
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
import { JobseekerComponent } from './components/core/jobseeker/jobseeker.component';
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

    { 
        path: 'jobseeker', 
        component: JobseekerComponent, 
        canActivate: [AuthGuard],
        children: [
            
        ] 
    },
    
    { 
        path: 'company', 
        component: CompanyComponent, 
        canActivate: [AuthGuard], 
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          { path: 'dashboard', component: CompanyProfileComponent},
          { path: 'jobs', component: CompanyJobsComponent },
          { path: 'applications', component: CompanyApplicationsComponent },
          { path: 'profile', component: CompanyProfileComponent},
          { path: 'settings', component: CompanySettingsComponent},
        ] 
    },

    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'jobs', component: AdminJobsComponent },
            { path: 'jobseekers', component: AdminJobseekersComponent },
            { path: 'jobfields', component: AdminJobfieldsComponent },
            { path: 'company', component: AdminCompanyComponent },
        ]
    },
    { path: '**', component: NotfoundComponent },
];
