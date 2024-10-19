import sendMail from '../email.service';
import { EmailOptions } from '../interfaces/email.interface';
import logger from '../../config/logger.config';

/**
 * Function to send application
 * @param application
 */
export const sendApplicationConfirmationEmail = async (application: any) => {
  const emailOptions: EmailOptions = {
    email: application.jobSeeker.email,
    subject: 'Application Received: ' + application.job.title,
    template: 'application-confirmation',
    body: {
      jobTitle: application.job.title,
      companyName: application.job.company.name,
      appliedAt: application.appliedAt.toDateString(),
    },
  };

  try {
    await sendMail(emailOptions);
    logger.info(`Application confirmation email sent to ${application.jobSeeker.email}`);
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to send application confirmation email:', err.message || err);
  }
};
