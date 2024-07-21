// Navigation Components/Resume.js
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { StyledBox } from '../Custom Styles/commonstyles';

const Resume = () => {
  return (
    <StyledBox>
      <Typography variant="h2" align="center" gutterBottom>
        Resume
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Technical Skills</Typography>
        <Typography variant="body1">
          Java, JavaScript (React, Node JS, Express), C, Swift, Unix, Git, Splunk, Postman, Unity, VS Code, Xcode
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Experience</Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Florida Blue/GuideWell: Associate IT Developer</Typography>
          <Typography variant="body2" color="textSecondary">June 2024 – Present</Typography>
          <Typography variant="body1">
            • Utilized react to create responsive user interfaces and used node.js/express to build backend services.<br />
            • Implemented RESTful APIs to support front-end functionality for communication between the client and server.<br />
            • Deployed and maintained applications using Jenkins and Openshift.<br />
            • Participated in agile development practices including sprint planning, daily stand-ups, and retrospective meetings.
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Florida Blue/GuideWell: Intern IT Developer</Typography>
          <Typography variant="body2" color="textSecondary">May 2023 – May 2024</Typography>
          <Typography variant="body1">
            • Developed and implemented a predictive analytics Splunk dashboard to display traffic to services.<br />
            • Resolved bugs in multiple web applications, demonstrating strong problem-solving skills and contributed to the overall improvement of software reliability and user experience.
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">UCF Department of Computer Science: Undergraduate Teaching Assistant</Typography>
          <Typography variant="body2" color="textSecondary">January 2023 – May 2024</Typography>
          <Typography variant="body1">
            • Conducted office hours to address students’ questions to enhance their understanding of course material.<br />
            • Managed student questions via email graded all assignments and exams in a timely manner.
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Khalil Ventures (Mathnasium): Math Instructor</Typography>
          <Typography variant="body2" color="textSecondary">December 2021 – May 2022</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">IBM Accelerate, Software Engineering Track</Typography>
          <Typography variant="body2" color="textSecondary">May 2022 – August 2022</Typography>
          <Typography variant="body1">
            • Attended weekly skills workshops and professional development workshops.<br />
            • Learned basic concepts of JavaScript and React, Web App Security, Event Handling, GitHub, server development, Node JS.
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Education</Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">B.S. Computer Science</Typography>
          <Typography variant="body2" color="textSecondary">Aug. 2020 – Dec. 2024</Typography>
          <Typography variant="body1">University of Central Florida - Burnett Honors College<br />GPA: 3.878</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">B.A. Music</Typography>
          <Typography variant="body2" color="textSecondary">Aug. 2020 – Dec. 2024</Typography>
          <Typography variant="body1">University of Central Florida - Burnett Honors College<br />GPA: 3.878</Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Projects</Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Flavor Fusion: Smart Spice Maker</Typography>
          <Typography variant="body2" color="textSecondary">Jan. 2024 – Dec. 2024</Typography>
          <Typography variant="body1">
            • Collaborated with MAE students to research, design, and build a machine to store, mix, and dispense spices.<br />
            • Computer Science developer role focused on mobile app development and Bluetooth integration with the machine.
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">iPhone Music Practice App</Typography>
          <Typography variant="body2" color="textSecondary">Feb. 2023 – Dec. 2023</Typography>
          <Typography variant="body1">
            • Developed an iPhone app using the SwiftUI API.<br />
            • Features on the app included a working metronome, tuner, recorder, and notes calendar.
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Virtual Reality Game</Typography>
          <Typography variant="body2" color="textSecondary">Jan. 2023 – Apr. 2023</Typography>
          <Typography variant="body1">
            • Developed a VR game using Unity and the Oculus Integration SDK to run on the Oculus Quest.<br />
            • Incorporated travel techniques, user interactions, physics-based interactions, animations, and a user interface.
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">To-Do List Web Application</Typography>
          <Typography variant="body2" color="textSecondary">Jun. 2022 – Aug. 2022</Typography>
          <Typography variant="body1">
            • Developed a user-friendly To-Do List Web App using HTML, CSS, and JavaScript, featuring dynamic task handling and real-time updates.<br />
            • Implemented secure authentication, REST API, and integrated a relational database for efficient data storage and retrieval.
          </Typography>
        </Box>
      </Paper>
    </StyledBox>
  );
};

export default Resume;
