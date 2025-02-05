import React, { useState } from 'react';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Calendar from './Calendar';
import EventList from './EventList';

interface Event {
  date: string;
  event: string;
}

interface CalendarWithEventsProps {
  events: Event[];
  onAddEvent: (newEvent: Event) => void;
}

const CalendarWithEvents: React.FC<CalendarWithEventsProps> = ({ events, onAddEvent }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          maxWidth: 600,
          margin: '0 auto',
          padding: 3,
          borderRadius: 2,
          backgroundColor: '#f9f9f9',
          boxShadow: 4,
        }}
      >
        {/* Calendar */}
        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} onAddEvent={onAddEvent} />

        {/* Events Section */}
        <EventList events={events} selectedDate={selectedDate} />
      </Box>
    </LocalizationProvider>
  );
};

export default CalendarWithEvents;
