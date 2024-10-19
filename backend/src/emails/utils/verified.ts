import sendMail from '../email.service';
import { EmailOptions } from '../interfaces/email.interface';
import logger from '../../config/logger.config';

/**
 * Function 
 * @param company - Verified company data
 */
export const sendCompanyVerifiedEmail = async (company: any) => {
  const emailOptions: EmailOptions = {
    email: company.businessEmail,
    subject: 'Your Company has been Verified!',
    template: 'verified',
    body: {
      companyName: company.name,
      adminContact: 'admin@forjobseekers.com',
    },
  };

  try {
    await sendMail(emailOptions);
    logger.info(`Verification email sent to ${company.businessEmail}`);
  } catch (error) {
    const err = error as Error;
    logger.error('Failed to send verification email:', err.message || err);
  }
};
