import React, { useState } from 'react';
import { Card, CardContent, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TestComp } from './test';

interface CalendarProps {
  selectedDate: Date | null;
  onDateChange: (newDate: Date | null) => void;
  onAddEvent: (newEvent: { date: string; event: string }) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange, onAddEvent }) => {
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ date: '', event: '' });

  const handleDateChange = (newDate: Date | null) => {
    onDateChange(newDate);
    if (newDate) {
      const currentDate = new Date();
      // Only allow adding events for today or future dates
      if (newDate >= currentDate) {
        setNewEvent({ date: newDate.toISOString().split('T')[0], event: '' });
        setOpen(true);
      }
    }
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSaveEvent = () => {
    if (newEvent.event && newEvent.date) {
      onAddEvent(newEvent);
      setNewEvent({ date: '', event: '' });
      setOpen(false);
    }
  };

  return (
    <Card sx={{ width: '100%', borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}  // Use onChange to handle date selection
          sx={{ width: '100%', borderRadius: 2, backgroundColor: '#ffffff', padding: 2 }}
        />
      </CardContent>

      {/* Add Event Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            label="Event Name"
            name="event"
            value={newEvent.event}
            onChange={handleEventChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Event Date"
            name="date"
            type="date"
            value={newEvent.date}
            onChange={handleEventChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveEvent} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <TestComp/>
    </Card>
  );
};

export default Calendar;
