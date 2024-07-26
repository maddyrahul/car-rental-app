
export interface CarDetails{
    vehicle_Id:number;
    maker:string;
    model:string;
    rental_Price:number;
    availability_status:string;
    image_Link:string;
     
}

export interface User {
    userId: number;
    name?: string;  
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
     
  }

  
export interface AdminLoginUser {
    adminId: number;
    email: string;
    password: string;   
  }

  export interface RentalAgreement {
    rentalAgreementId: number;
    userId: number;
    carDetails: CarDetails;
    vehicle_Id: number;
    user: User,
    bookingDate: string;
    returnDate: string;
    isReturned: string;
    requestForReturn: any; 
  }
  

  export interface RentalAgreementDto {
    rentalAgreementId: number;
    userId: number;
    vehicle_Id: number;
    bookingDate: string;
    returnDate: string;
    isReturned: string;
    requestForReturn: string;
  }