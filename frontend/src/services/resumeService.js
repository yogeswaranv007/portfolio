import resumeData from '../data/resume.json';

/**
 * Handles viewing and downloading the resume.
 * Designed to easily support future analytics by allowing an API call before the action.
 */
class ResumeService {
  /**
   * Opens the resume in a new browser tab
   */
  async viewResume() {
    try {
      // Future: await apiCallToTrackView();
      window.open(resumeData.path, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error viewing resume:', error);
    }
  }

  /**
   * Triggers a direct download of the resume
   */
  async downloadResume() {
    try {
      // Future: await apiCallToTrackDownload();
      
      const link = document.createElement('a');
      link.href = resumeData.path;
      link.download = resumeData.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  }

  getResumeMetadata() {
    return resumeData;
  }
}

export const resumeService = new ResumeService();
