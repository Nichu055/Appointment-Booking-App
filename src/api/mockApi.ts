type Appointment = {
  id: string;
  name: string;
  datetime: string;
  reason: string;
  phone: string;
  email: string;
  staff: string;
  countryCode: string;
};

const STORAGE_KEY = 'appointments';

function loadAppointments(): Appointment[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveAppointments() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

const appointments: Appointment[] = loadAppointments();

export function addAppointment(data: Omit<Appointment, 'id'>): Appointment {
  const id = (appointments.length + 1).toString();
  const appointment = { id, ...data };
  appointments.push(appointment);
  saveAppointments();
  return appointment;
}

export function getAppointments(): Appointment[] {
  return [...appointments];
}

export function getAppointmentById(id: string): Appointment | undefined {
  return appointments.find(a => a.id === id);
}
