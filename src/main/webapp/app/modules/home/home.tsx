import React from 'react';
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';
import { faUserFriends, faHistory, faCompass, faBookOpen, faUsers, faCalendarAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
const Home: React.FC = () => {
  return (
    <Box sx={{ fontFamily: 'Roboto, sans-serif', color: '#2c3e50', width: '100%' }}>
      {/* Hero Section with Parallax Effect */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: 'url("/content/images/mosq1.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "40px",
            borderRadius: "15px",
            maxWidth: "80%",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "4rem" },
              fontWeight: 700,
              textShadow: "3px 3px 6pxz rgba(0, 0, 0, 0.7)",
              marginBottom: "20px",
              color: "#ffd700", // Gold color
            }}
          >
            Welcome to{" "}
            <span style={{ color: "#2ecc71" }}>Al Imran Islamic School</span>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.8rem" },
              textShadow: "3px 3px 6px rgba(0, 0, 0, 0.7)",
              marginBottom: "30px",
            }}
          >
            Enlightening Minds, Inspiring Hearts
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2ecc71",
              color: "#fff",
              padding: "12px 30px",
              fontSize: "1rem",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#27ae60" },
              textTransform: "uppercase",
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
      {/* About Us Section */}
      <Box sx={{ padding: '60px 20px', backgroundColor: '#ecf0f1' }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  marginBottom: '20px',
                  color: '#2c3e50',
                  fontSize: '2.5rem',
                }}
              >
                About Al Imran
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.2rem',
                  color: '#7f8c8d',
                  lineHeight: '1.6',
                }}
              >
                We are dedicated to providing a holistic educational experience to our students. Our curriculum focuses not only on academic excellence but also on fostering moral values, cultural understanding, and leadership qualities.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ maxWidth: 345, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)', transition: 'transform 0.3s ease' }}>
                <CardMedia
                  component="img"
                  alt="About Image"
                  height="200"
                  image="/content/images/pexels-diego-f-parra-33199-15129772.jpg"
                />
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Our Vision
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    To inspire a generation of learners who are empowered with the knowledge, skills, and values to contribute positively to society.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: '#f4f6f9', padding: '80px 0' }}>
        <Container>
          <Typography
            variant="h4"
            sx={{
              marginBottom: '50px',
              textAlign: 'center',
              fontWeight: 700,
              color: '#2ecc71',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontSize: '36px',
              lineHeight: 1.4,
            }}
          >
            Our Services
          </Typography>

          <Grid container spacing={6}>
            {/* Service 1: Islamic Education */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: '16px',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
                  opacity: 0.95,
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.15)',
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image="content/images/pexels-meyra-342797656-16092111.jpg"
                  alt="Islamic Education"
                  sx={{
                    height: 220,
                    objectFit: 'cover',
                    filter: 'brightness(0.8)',
                  }}
                />
                <CardContent sx={{ padding: '20px', textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#2ecc71',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    Islamic Education
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#34495e', lineHeight: 1.6 }}>
                    Offering deep insights into Islamic studies with modern teaching methods, including Quran, Hadith, Fiqh, and more.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Service 2: Islamic Counselling */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: '16px',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
                  opacity: 0.95,
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.15)',
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image="content/images/pexels-amirhadi-manavi-1074353688-20623404.jpg"
                  alt="Islamic Counselling"
                  sx={{
                    height: 220,
                    objectFit: 'cover',
                    filter: 'brightness(0.8)',
                  }}
                />
                <CardContent sx={{ padding: '20px', textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#2ecc71',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    Islamic Counselling
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#34495e', lineHeight: 1.6 }}>
                    Helping students navigate life challenges with guidance from professional counsellors rooted in Islamic principles.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Service 3: Research and Innovation */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: '16px',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
                  opacity: 0.95,
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.15)',
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image="content/images/pexels-mraqieb-1348301-7300900.jpg"
                  alt="Research and Innovation"
                  sx={{
                    height: 220,
                    objectFit: 'cover',
                    filter: 'brightness(0.8)',
                  }}
                />
                <CardContent sx={{ padding: '20px', textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#2ecc71',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    Research & Innovation
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#34495e', lineHeight: 1.6 }}>
                    Leading groundbreaking research that aligns with Islamic values and contributes to global innovation across various fields.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Service 4: Community Outreach */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: '16px',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
                  opacity: 0.95,
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.15)',
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image="content/images/pexels-anthonyshkraba-production-8837517.jpg"
                  alt="Community Outreach"
                  sx={{
                    height: 220,
                    objectFit: 'cover',
                    filter: 'brightness(0.8)',
                  }}
                />
                <CardContent sx={{ padding: '20px', textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#2ecc71',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    Community Outreach
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#34495e', lineHeight: 1.6 }}>
                    Engaging with the wider community through charity initiatives, social events, and outreach programs rooted in Islamic values.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Service 5: Spiritual Development */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: '16px',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
                  opacity: 0.95,
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.15)',
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image="content/images/pexels-michael-burrows-7129744.jpg"
                  alt="Spiritual Development"
                  sx={{
                    height: 220,
                    objectFit: 'cover',
                    filter: 'brightness(0.8)',
                  }}
                />
                <CardContent sx={{ padding: '20px', textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#2ecc71',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    Spiritual Development
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#34495e', lineHeight: 1.6 }}>
                    Providing workshops and programs focused on fostering spiritual growth, mindfulness, and self-reflection in students.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>


      <Box sx={{ backgroundColor: '#2ecc71', color: '#fff', padding: '80px 20px' }}>
        <Container>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              marginBottom: '50px',
              fontWeight: 700,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '36px',
              lineHeight: 1.5,
              
            }}
          >
            Why Choose Us?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                icon: faBookOpen,
                title: 'Comprehensive Curriculum',
                description: 'Our curriculum is designed to equip students with both practical and theoretical knowledge in various Islamic disciplines, ensuring a holistic understanding.'
              },
              {
                icon: faUserFriends,
                title: 'Community Engagement',
                description: 'We emphasize the importance of building a strong community, offering events, group activities, and a support system that fosters collaboration and personal growth.'
              },
              {
                icon: faCompass,
                title: 'Guidance and Support',
                description: 'We provide continuous mentorship and academic support, guiding students in their spiritual, academic, and personal journeys throughout their studies.'
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    padding: '30px',
                    borderRadius: '12px',
                    backgroundColor: '#34495e',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    height:300,
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0px 15px 45px rgba(0, 0, 0, 0.3)',
                    },
                  }}
                >
                  <FontAwesomeIcon
                    icon={feature.icon}
                    size="4x"
                    style={{
                      color: '#f1c40f',
                      marginBottom: '20px',
                      transition: 'color 0.3s ease',
                    }}

                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#fff',
                      marginTop: '20px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#ecf0f1',
                      marginTop: '10px',
                      lineHeight: 1.6,
                      fontSize: '14px',
                      maxWidth: '320px',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>


      <Box sx={{ backgroundColor: '#f9f9f9', padding: '40px 0' }}>
        <Container sx={{ minWidth: '100%' }}>
\

          <Grid container spacing={6}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography
                variant="h5"
                sx={{
                  marginBottom: '16px',
                  color: '#2ecc71',
                  fontWeight: 700,  // Slightly bolder for better emphasis
                  textAlign: 'center',
                  fontSize: '1.25rem', // Slightly larger font size for better prominence
                  letterSpacing: '1px', // Increased letter spacing for more elegance
                  lineHeight: '1.5', // To give space between the letters for a cleaner look
                }}
              >
              <FontAwesomeIcon icon={faUserFriends} />   Our Founders
              </Typography>

              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '12px', // Slightly larger border radius for a smoother curve
                  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.12)', // Softened but deeper shadow for more depth
                  padding: '30px',  // Increased padding for content breathing space
                  textAlign: 'center',
                  marginBottom: '40px',  // Increased margin for better separation
                  width: '100%',
                  maxWidth: '480px', // Max width slightly increased for better content flow
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 'auto', // Flexible height based on content
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effect
                  '&:hover': {
                    transform: 'translateY(-5px)', // Lift the card up slightly on hover
                    boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.15)', // Enhanced shadow for the hover effect
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    marginBottom: '18px',  // Increased bottom margin for better spacing
                    color: '#34495e',
                    fontSize: '1rem',
                    lineHeight: '1.8', // Increased line height for improved readability
                    fontWeight: 400,
                    textAlign: 'center',
                    maxWidth: '420px',  // Limiting width for text readability
                    margin: '0 auto', // Ensures text doesn't stretch too wide
                  }}
                >
                  Our school was founded by a group of passionate educators and community leaders who envisioned a place where Islamic values and academic excellence could thrive together.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#34495e',
                    fontSize: '1rem',
                    lineHeight: '1.8', // Consistent line height for both paragraphs
                    fontWeight: 400,
                    textAlign: 'center',
                    maxWidth: '420px',
                    margin: '0 auto',
                  }}
                >
                  Through their dedication, they laid the foundation for what is now a thriving institution.
                </Typography>
              </Box>
            </Grid>



            {/* Contributors Section (Moved to the right) */}
            <Grid item xs={12} md={7} sx={{ paddingLeft: { md: '40px', xs: '0' } }}>
              <Typography variant="h5" sx={{ marginBottom: '20px', color: '#2ecc71', fontWeight: 600 }}>
                Our Contributors
              </Typography>
              <Grid container spacing={4}>
                {[
                  {
                    name: 'Dr. Ahmed',
                    image: "pexels.jpg",
                    description: 'Dr. Ahmed is a highly respected leader in the educational community, known for his dedication to the growth and success of students.'
                  },
                  {
                    name: 'Community Donors',
                    image: "pexels-thirdman-8489309.jpg",
                    description: 'Our community donors are the backbone of our institution, providing vital support and ensuring that our students thrive.'
                  },
                  {
                    name: 'Our Volunteers',
                    image: "pexels-pixabay-256491.jpg",
                    description: 'Our volunteers contribute their time and energy to make a lasting impact in our school community, supporting events, programs, and initiatives.'
                  }
                ].map((contributor, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        borderRadius: '15px',
                        boxShadow: 3,
                        '&:hover': { boxShadow: 8, transform: 'translateY(-5px)', transition: 'all 0.3s ease' },
                        textAlign: 'center',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        width: '100%',
                        height: 460,
                      }}
                    >
                      {/* Dynamic Image Based on Contributor */}
                      <CardMedia
                        component="img"
                        image={`content/images/${contributor.image}`} // Using dynamic image path
                        alt={contributor.name}
                        sx={{
                          height: 200,
                          objectFit: 'cover',
                          borderRadius: '15px 15px 0 0',
                        }}
                      />
                      <CardContent sx={{ padding: '25px' }}>
                        <Typography
                          variant="h6"
                          sx={{
                            marginBottom: '10px',
                            fontWeight: 700,
                            color: '#2ecc71',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                          }}
                        >
                          {contributor.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#34495e',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            marginBottom: '15px',
                            fontWeight: 400,
                            textAlign: 'justify',
                          }}
                        >
                          {contributor.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}

              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>


      {/* Gallery Section */}
      <Box sx={{ backgroundColor: '#f2f2f2', padding: '60px 20px' }}>
        <Container sx={{ minWidth: "100%" }}>

          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              gap: '20px',
              padding: '20px 0',
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': {
                height: '10 px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#2ecc71',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#e0e0e0',
              },
            }}
            onWheel={(e) => {
              e.preventDefault(); // Prevent vertical scrolling
              e.currentTarget.scrollLeft += e.deltaY; // Scroll horizontally
            }}
          >
            {[
              'content/images/pexels-diego-f-parra-33199-15129772.jpg',
              'content/images/pexels-rdne-7249320.jpg',
              'content/images/pexels-thirdman-7957071.jpg',
              'content/images/pexels-thirdman-7984737.jpg',
              'content/images/pexels-bozanguzel-9884692.jpg',
              'content/images/pexels-batuhan-kocabas-123879152-17161884.jpg',
              'content/images/pexels-ashwinwithcam-13524595.jpg',
            ].map((image, index) => (
              <Box
                key={index}
                sx={{
                  flexShrink: 0,
                  borderRadius: '10px',
                  border: '5px solid #f39c12', // Gold frame
                  overflow: 'hidden',
                  width: '300px', // Set a fixed width for images to keep them consistent
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={image}
                  alt={`Gallery Image ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: '400px', // Fixed height to ensure consistency
                    objectFit: 'cover', // Ensures proper scaling without distortion
                  }}
                />
              </Box>
            ))}
          </Box>

        </Container>
      </Box>

      <Box sx={{ backgroundColor: '#f9f9f9', padding: '60px 0' }}>
        <Container maxWidth="lg">

          <Grid container spacing={6}>
            {/* FAQ Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ marginBottom: '30px', color: '#2ecc71', fontWeight: 600 }}>
                Frequently Asked Questions
              </Typography>

              {/* FAQ Search Field */}
              <TextField
                label="Search FAQ"
                variant="outlined"
                fullWidth
                sx={{
                  marginBottom: '30px',
                  backgroundColor: '#fff',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                  },
                }}
                placeholder="Search for questions..."
              />

              <Grid container spacing={2}>
                {[
                  {
                    question: 'What is the school’s curriculum?',
                    answer:
                      'Our curriculum is based on Islamic values with a blend of modern academic excellence.',
                  },
                  {
                    question: 'How can I enroll my child?',
                    answer:
                      'Please visit the "Admissions" section on our website for detailed information on the enrollment process.',
                  },
                  {
                    question: 'Are there scholarships available?',
                    answer: 'Yes, we offer need-based scholarships to eligible students.',
                  },
                ].map((faq, index) => (
                  <Grid item xs={12} key={index}>
                    <Accordion sx={{ borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease' }}>
                      <AccordionSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />} sx={{ backgroundColor: '#eaf1e4' }}>
                        <Typography sx={{ fontWeight: 600, color: '#2ecc71' }}>{faq.question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ backgroundColor: '#f7f7f7' }}>
                        <Typography>{faq.answer}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Contact Us Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ marginBottom: '30px', color: '#2ecc71', fontWeight: 600 }}>
                Contact Us
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  sx={{
                    backgroundColor: '#fff',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                />
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  sx={{
                    backgroundColor: '#fff',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                />
                <TextField
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  sx={{
                    backgroundColor: '#fff',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#2ecc71',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#27ae60' },
                    padding: '12px 20px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Submit
                </Button>
              </Box>


            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: '#2c3e50', color: '#ecf0f1', padding: '40px 20px' }}>
      <Container>
        <Grid container spacing={4}>
          {/* Contact Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 700 }}>
              Al Imran Islamic School
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <FontAwesomeIcon icon={faMapMarkerAlt as IconProp} style={{ marginRight: '10px', color: '#1abc9c' }} />
              <Typography>123 Main Street, City, Country</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <FontAwesomeIcon icon={faEnvelope as IconProp} style={{ marginRight: '10px', color: '#1abc9c' }} />
              <Typography>info@alimranschool.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <FontAwesomeIcon icon={faPhone as IconProp} style={{ marginRight: '10px', color: '#1abc9c' }} />
              <Typography>+1 234 567 890</Typography>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 700 }}>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ padding: 0, listStyle: 'none', margin: 0 }}>
              <li>
                <Button
                  sx={{
                    color: '#ecf0f1',
                    justifyContent: 'flex-start',
                    padding: 0,
                    textTransform: 'none',
                    '&:hover': { color: '#1abc9c' },
                  }}
                >
                  Home
                </Button>
              </li>
              <li>
                <Button
                  sx={{
                    color: '#ecf0f1',
                    justifyContent: 'flex-start',
                    padding: 0,
                    textTransform: 'none',
                    '&:hover': { color: '#1abc9c' },
                  }}
                >
                  About Us
                </Button>
              </li>
              <li>
                <Button
                  sx={{
                    color: '#ecf0f1',
                    justifyContent: 'flex-start',
                    padding: 0,
                    textTransform: 'none',
                    '&:hover': { color: '#1abc9c' },
                  }}
                >
                  Admissions
                </Button>
              </li>
              <li>
                <Button
                  sx={{
                    color: '#ecf0f1',
                    justifyContent: 'flex-start',
                    padding: 0,
                    textTransform: 'none',
                    '&:hover': { color: '#1abc9c' },
                  }}
                >
                  Contact
                </Button>
              </li>
            </Box>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 700 }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: '15px' }}>
              <Button
                sx={{
                  color: '#ecf0f1',
                  fontSize: '20px',
                  '&:hover': { color: '#1abc9c' },
                }}
              >
                <FontAwesomeIcon icon={faFacebook as IconProp} />
              </Button>
              <Button
                sx={{
                  color: '#ecf0f1',
                  fontSize: '20px',
                  '&:hover': { color: '#1abc9c' },
                }}
              >
                <FontAwesomeIcon icon={faTwitter as IconProp} />
              </Button>
              <Button
                sx={{
                  color: '#ecf0f1',
                  fontSize: '20px',
                  '&:hover': { color: '#1abc9c' },
                }}
              >
                <FontAwesomeIcon icon={faInstagram as IconProp} />
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box
          sx={{
            borderTop: '1px solid #7f8c8d',
            marginTop: '40px',
            paddingTop: '20px',
            textAlign: 'center',
            fontSize: '0.875rem',
          }}
        >
          © {new Date().getFullYear()} Al Imran Islamic School. All Rights Reserved.
        </Box>
      </Container>
    </Box>
    </Box>
  );
};

export default Home;
