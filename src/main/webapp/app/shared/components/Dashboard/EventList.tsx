import React from 'react';
import { Box, Typography, List, ListItem, Chip, Card, CardContent } from '@mui/material';

interface Event {
  date: string;
  event: string;
}

interface EventListProps {
  events: Event[];
  selectedDate: Date | null;
}

const EventList: React.FC<EventListProps> = ({ events, selectedDate }) => {
  const filteredEvents = events.filter(
    (event) => event.date === selectedDate?.toISOString().split('T')[0]
  );

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600, textAlign: 'center' }}>
        Events on {selectedDate?.toLocaleDateString()}
      </Typography>

      <Card sx={{ marginTop: 2, borderRadius: 3, boxShadow: 1, backgroundColor: '#ffffff' }}>
        <CardContent>
          <List sx={{ padding: 0 }}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>{event.event}</Typography>
                  <Chip label="Upcoming" color="primary" size="small" sx={{ marginLeft: 2 }} />
                </ListItem>
              ))
            ) : (
              <ListItem sx={{ justifyContent: 'center' }}>
                <Typography>No events for this day</Typography>
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventList;
