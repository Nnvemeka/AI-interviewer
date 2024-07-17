import React from "react";
import styles from "./page.module.css";

const Documentation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>AI Interviewer User Manual</h1>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>Introduction</h2>
          <p>
            Welcome to the AI Interviewer Web Application! This application
            allows you to upload your resume and receive an AI-driven verbal
            interview based on the content of your resume. Follow the steps
            below to get started.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>Step-by-Step Guide</h2>

          <h3 className={styles.stepTitle}>Step 1: Upload Your Resume</h3>
          <p>
            Navigate to the homepage and use the file upload feature to upload
            your resume. The accepted formats are PDF and Word documents.
          </p>

          <h3 className={styles.stepTitle}>Step 2: Wait for Processing</h3>
          <p>
            Once you upload your resume, the application will process the
            document. A progress indicator will show the status of the
            processing. This usually takes between 5 to 10 seconds.
          </p>

          <h3 className={styles.stepTitle}>Step 3: Start the AI Interview</h3>
          <p>
            After processing, the AI interview will begin. You will hear verbal
            questions generated based on the content of your resume. Respond to
            these questions as you would in a real interview.
          </p>

          <h3 className={styles.stepTitle}>Step 4: Receive Feedback</h3>
          <p>
            The AI will provide real-time feedback and may ask follow-up
            questions based on your responses. This simulates a realistic
            interview experience and helps you prepare better.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>Features</h2>
          <ul className={styles.list}>
            <li>Clean and intuitive user interface</li>
            <li>File upload feature for resumes in PDF or Word format</li>
            <li>Progress indicator while the resume is being processed</li>
            <li>AI-driven verbal interview tailored to the resume content</li>
            <li>Real-time feedback and follow-up questions</li>
            <li>Responsive design for different devices and screen sizes</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>Troubleshooting</h2>
          <p>
            If you encounter any issues while using the application, consider
            the following tips:
          </p>
          <ul className={styles.list}>
            <li>Ensure your resume is in PDF or Word format.</li>
            <li>
              Check your internet connection if the processing takes longer than
              expected.
            </li>
            <li>Reload the page and try uploading your resume again.</li>
            <li>
              If you receive an error message, follow the instructions provided
              or contact support.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subtitle}>Contact Support</h2>
          <p>
            If you need further assistance, please contact our support team We
            are here to help!
          </p>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
