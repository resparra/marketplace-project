import { render, screen } from '@testing-library/react';
import Header from './components/navbar';
import Sidebar from './components/sidebar';
import getTimeSpots from './utils/timeslots'
import isoDateString from './utils/isodate'

test('render navbar', () => {
  render(<Header />);
  const linkElement = screen.getByText(/Marketplace/i);
  expect(linkElement).toBeInTheDocument();
});


test('render sidebar', () => {
  render(
      <Sidebar
        handleSelectedProvider={() => {return false}}
        selectedProvider={null}
        />
    );
  const linkElement = screen.getByText("Select specialty ...");
  expect(linkElement).toBeInTheDocument();
});


test('time slots', () => {
    var start = "08:00";
    var end = "9:00";
    var timeSlots = ["08:00", "08:15","08:30", "08:45", "09:00"];

    expect(getTimeSpots(start, end)).toEqual(timeSlots);
});

test('iso date', () => {
    var date = new Date(2020, 8, 10);
    expect(isoDateString(date)).toBe("2020-09-10");
});
