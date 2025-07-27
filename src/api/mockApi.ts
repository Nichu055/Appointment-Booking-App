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

const appointments: Appointment[] = [];

export function addAppointment(data: Omit<Appointment, 'id'>): Appointment {
  const id = (appointments.length + 1).toString();
  const appointment = { id, ...data };
  appointments.push(appointment);
  return appointment;
}

export function getAppointments(): Appointment[] {
  return [...appointments];
}

export function getAppointmentById(id: string): Appointment | undefined {
  return appointments.find(a => a.id === id);
}
