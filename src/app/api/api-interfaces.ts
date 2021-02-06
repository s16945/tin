export interface Athlete {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  birthDate: string;
  currentClub: string;
}

export interface Manager {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  careerStartDate: string;
}

export interface Transfer {
  _id: number;
  athlete_id: number;
  manager_id: number;
  newClub: string;
  transferDate: string;
  price: number;
  commission: number;
  isLoan: boolean;
  contractStartDate: string;
  contractEndDate: string;
  athlete: Athlete;
  manager: Manager;
}
