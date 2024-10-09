-- CreateIndex
CREATE INDEX "Application_jobId_idx" ON "Application"("jobId");

-- CreateIndex
CREATE INDEX "Application_jobSeekerId_idx" ON "Application"("jobSeekerId");

-- CreateIndex
CREATE INDEX "Certification_jobSeekerId_idx" ON "Certification"("jobSeekerId");

-- CreateIndex
CREATE INDEX "Company_userId_idx" ON "Company"("userId");

-- CreateIndex
CREATE INDEX "Job_companyId_idx" ON "Job"("companyId");

-- CreateIndex
CREATE INDEX "Job_jobFieldId_idx" ON "Job"("jobFieldId");

-- CreateIndex
CREATE INDEX "Job_title_idx" ON "Job"("title");

-- CreateIndex
CREATE INDEX "JobSeeker_jobFieldId_idx" ON "JobSeeker"("jobFieldId");

-- CreateIndex
CREATE INDEX "JobSeeker_userId_idx" ON "JobSeeker"("userId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "WorkExperience_jobSeekerId_idx" ON "WorkExperience"("jobSeekerId");
