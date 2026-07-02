export type ParkingStatus = 'Занято' | 'Свободно';

export interface Parking {
  id: string;
  placeNumber: number;
  licensePlate: string;
  ownerName: string;
  status: ParkingStatus;
}

export type ParkingFormValues = Omit<Parking, 'id'>;
