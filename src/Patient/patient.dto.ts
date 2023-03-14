import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MinLength, MaxLength, Matches, IsDate } from "class-validator";
export class PatientForm {

    @IsNotEmpty({ message: "Please provide your username" })
    @IsString()
    @MinLength(3)
    @MaxLength(65)
    username: string;

    @IsNotEmpty({ message: "Please provide your password" })
    @IsString()
    @MinLength(5)
    @MaxLength(65)
    password: string;


    @IsNotEmpty({ message: "Please provide your name" })
    @IsString()
    @MinLength(3)
    @MaxLength(65)

    patientname: string;

    @IsNotEmpty({ message: "Please provide your name" })
    @IsString()
    @MinLength(3)
    @MaxLength(65)
    address: string;

    @IsNotEmpty({ message: "Please provide your email" })
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

    email: string;


    @IsNotEmpty({ message: "Please provide your phone number" })

    @Matches(/^(?:(?:\+|00)88|01)?\d{11}$/)

    phone: string;

    //@IsNotEmpty({ message: "Please upload your picture" })
    picture: string;

}
export class PatientFormlab {

    @IsNotEmpty({ message: "Please provide your username name" })
    @IsString()
    @MinLength(3)
    @MaxLength(65)

    username: string;

    @IsNotEmpty({ message: "Please provide your name" })
    @IsString()
    @MinLength(3)
    @MaxLength(65)

    patientname: string;

    @IsNotEmpty({ message: "Please provide your email" })
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

    email: string;

    @IsNotEmpty({ message: "Please provide the test name" })
    @IsString()
    @MinLength(3)
    @MaxLength(65)

    testname: string;

   // @IsNotEmpty({ message: "Please upload your prescription" })
    prescription: string;
    //@IsNotEmpty()
    patientid: number;

}
export class AppointmnetForm {

    @IsNotEmpty({ message: "Please provide your name" })
    @IsString()
    @MinLength(3)
    @MaxLength(65)
    patientname: string;

    @IsNotEmpty({ message: "Please provide your age" })
    //@IsNumber()
    age: number;

    @IsNotEmpty({ message: "Please enter the department name" })
    @IsString()
    departmentname: string;

    @IsNotEmpty({ message: "Please enter the doctor name" })
    @IsString()
    @MinLength(3)
    @MaxLength(65)
    doctorname: string;

    @IsNotEmpty({ message: "Please enter the date you want to meet" })
    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsNotEmpty({ message: "Please provide your blood group" })
    @IsString()
    bloodgroup: string;


    patientid1 :number;

    doctorid: number;

    

}