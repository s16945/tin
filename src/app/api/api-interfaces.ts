export interface Athlete {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  birthDate: Date;
}

export interface Manager {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  careerStartDate: Date;
}

export interface Transfer {
  _id: number;
  athlete_id: number;
  manager_id: number;
  currentClub: string;
  newClub: string;
  transferDate: Date;
  price: number;
  commission: number;
  isLoan: boolean;
  contractStartDate: Date;
  contractEndDate: Date;
  athlete: Athlete;
  manager: Manager;
}
