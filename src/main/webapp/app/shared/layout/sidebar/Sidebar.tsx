import React from 'react';
import {
  Box,
  List,
  ListItem,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Typography,
  Divider,
  styled,
} from '@mui/material';
import {
  faHome,
  faUserGraduate,
  faChalkboardTeacher,
  faUsers,
  faBook,
  faMoon,
  faSun,
  faUserCircle,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Custom Switch styled with green and gold colors
const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase': {
    color: '#008000', // Green is primary color now
    '&:hover': {
      backgroundColor: 'rgba(0, 128, 0, 0.1)',
    },
    '&.Mui-checked': {
      color: '#DAA520', // Gold when checked
      '&:hover': {
        backgroundColor: 'rgba(218, 165, 32, 0.1)',
      },
    },
  },
  '& .MuiSwitch-track': {
    backgroundColor: '#DAA520', // Gold track color
  },
}));

interface SidebarProps {
  onSelect: (option: string) => void;
  onLogout: () => void;
  onProfileClick: () => void;
  onSettingsClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onSelect,
  onLogout,
  onProfileClick,
  onSettingsClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: 260,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '2px solid #008000', // Green border
        height: '100vh',
        bgcolor: '#FFFFFF',
        background: 'linear-gradient(to right, #FFFFFF, #F5F5F5)',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: '#FFFFFF',
          borderBottom: '2px solid #008000', // Green border for header
        }}
      >
        <img
          src="/content/images/photo_2024-03-12_10-31-16.jpg"
          alt="School Logo"
          style={{ width: '40px', borderRadius: '50%' }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#008000' }}> {/* Green text */}
          SchoolX
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ p: 2 }}>
        <ListItem
          onClick={() => onSelect('Dashboard')}
          sx={{
            mb: 2,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              bgcolor: '#F0FFF0', // Light green hover effect
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <FontAwesomeIcon icon={faHome} size="lg" color="#008000" /> {/* Green icon */}
          <Typography sx={{ ml: 2 }}>Dashboard</Typography>
        </ListItem>

        <Typography
          variant="subtitle1"
          sx={{ mb: 1, fontWeight: 'bold', color: '#008000' }} 
        >
          Entities
        </Typography>

        <ListItem
          onClick={() => onSelect('Students')}
          sx={{
            mb: 1,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              bgcolor: '#F0FFF0',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <FontAwesomeIcon icon={faUserGraduate} size="lg" color="#008000" /> {/* Green icon */}
          <Typography sx={{ ml: 2 }}>Students</Typography>
        </ListItem>

        <ListItem
          onClick={() => onSelect('Teachers')}
          sx={{
            mb: 1,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              bgcolor: '#F0FFF0',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <FontAwesomeIcon icon={faUsers} size="lg" color="#008000" /> {/* Green icon */}
          <Typography sx={{ ml: 2 }}>Teachers</Typography>
        </ListItem>

        <ListItem
          onClick={() => onSelect('Classes')}
          sx={{
            mb: 1,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              bgcolor: '#F0FFF0',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <FontAwesomeIcon
            icon={faChalkboardTeacher}
            size="lg"
            color="#008000" // Green icon
          />
          <Typography sx={{ ml: 2 }}>Classes</Typography>
        </ListItem>

        <ListItem
          onClick={() => onSelect('Library')}
          sx={{
            mb: 1,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              bgcolor: '#F0FFF0',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <FontAwesomeIcon icon={faBook} size="lg" color="#008000" /> {/* Green icon */}
          <Typography sx={{ ml: 2 }}>Library</Typography>
        </ListItem>
      </List>

      {/* Footer */}
      <Box sx={{ p: 2, mt: 'auto', borderTop: '2px solid #008000' }}> {/* Green border */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon
            icon={isDarkTheme ? faMoon : faSun}
            size="lg"
            color="#008000" // Green icon
          />
          <CustomSwitch
            checked={isDarkTheme}
            onChange={() => setIsDarkTheme((prev) => !prev)}
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faUserCircle} size="lg" color="#008000" /> {/* Green icon */}
          <Typography variant="body2" sx={{ ml: 2, color: '#008000' }}>
            Admin
          </Typography>
          <IconButton onClick={handleMenuClick}>
            <FontAwesomeIcon icon={faEllipsisV} size="lg" color="#008000" /> {/* Green icon */}
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={() => onProfileClick()}>Profile</MenuItem>
            <MenuItem onClick={() => onSettingsClick()}>Settings</MenuItem>
            <MenuItem onClick={() => onLogout()}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
