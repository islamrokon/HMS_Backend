import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmnetForm, PatientForm , PatientFormlab } from './patient.dto';
import { PATIENTS} from './patient.mock';
import { PATIENTSLAB } from './patient.mocklab';
import { AppointmentEntity, LabEntity, PatientEntity } from './patiententity.entity';
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";
import { ServiceEntity } from 'src/Doctor/doctorservice.entity';

@Injectable()
export class PatientService {
    /*private patients = PATIENTS;
    private patientlab = PATIENTSLAB;*/
    constructor(
       
        @InjectRepository(LabEntity)
        private LabRepo: Repository<LabEntity>,
        @InjectRepository(PatientEntity)
        private PatientRepo: Repository<PatientEntity>,
        @InjectRepository(AppointmentEntity)
        private AppointmentRepo: Repository<AppointmentEntity>,
        @InjectRepository(ServiceEntity)
        private DoctorRepo: Repository<ServiceEntity>,
      
        @InjectRepository(PatientEntity)
        private PaymentRepo: Repository<PatientEntity>,
       
        private mailerService: MailerService
      ) {}
      
      
     async getPatients():Promise<any>{
        const patients = await this.PatientRepo.find();
        if(!patients || !patients[0]){
            throw new HttpException('Not Found!', 404);
        }
        return patients;
    }

    async showalldoctor():Promise<any>{
        const doctors = await this.DoctorRepo.find();
        if(!doctors || !doctors[0]){
            throw new HttpException('Not Found!', 404);
        }
        return doctors;
    }

    async labs():Promise<any>{
        const labs = await this.LabRepo.find();
        if(!labs || !labs[0]){
            throw new HttpException('Not Found!', 404);
        }
        return labs
        ;
    }

    async getPatientById(patientid: number): Promise<any> {
        const patient = await this.PatientRepo.findOneBy({patientid});
        if(!patient){
            throw new HttpException('Not Found!', 404);
        }
        else return patient;
    }

    async findPatientByEmail(email: string){
        return await this.PatientRepo.findOneBy({ email });
      }

    async getPatientlabById(testid): Promise<any> {
        const lab = await this.LabRepo.findOneBy({testid});
        if(!lab || lab[0]){
            throw new HttpException('Not Found!', 404);
        }
        return lab;
    }

    async getUserByIDName(id: number):Promise<any> {
        return this.DoctorRepo.findOneBy({ id });

    }
    
 
    async Signup(patient: PatientForm): Promise<any> {

        const patientadd = new PatientEntity()
        const salt = await bcrypt.genSalt();
       const hassedpassed = await bcrypt.hash(patient.password, salt);
       patient.password= hassedpassed;


        patientadd.patientname = patient.patientname;
        patientadd.username = patient.username;
        patientadd.email = patient.email;
        patientadd.password = patient.password;
        patientadd.phone = patient.phone;
        patientadd.picture = patient.picture;
        patientadd.address = patient.address;
       return await this.PatientRepo.save(patientadd);
  }

  async signin(mydto){
    console.log(mydto.password);
const mydata= await this.PatientRepo.findOneBy({email: mydto.email});
if(!mydata){
    throw new HttpException('Not Found!', 404);
}
else {
const isMatch= await bcrypt.compare(mydto.password, mydata.password);
if(isMatch) {
return 1;
}
else {
    return 0;
}
}

}

 async booklab (mydto:PatientFormlab):Promise<LabEntity>{
    const patient = await this.PatientRepo.findOneBy({patientid: mydto.patientid});
    const newlab = this.LabRepo.create(mydto);
    newlab.patient = patient;
    return await this.LabRepo.save(newlab);
 }


async addAppointment(appointmentdto: AppointmnetForm): Promise<AppointmentEntity> {
    const patient = await this.PatientRepo.findOneBy({patientid: appointmentdto.patientid1});
    const doctor = await this.DoctorRepo.findOneBy({id: appointmentdto.doctorid});
    const newappointment = this.AppointmentRepo.create(appointmentdto);
    newappointment.patient = patient;
    newappointment.Doctor = doctor;
    return await this.AppointmentRepo.save(newappointment);
}

async deletePatientById(patientid: number): Promise<any> {
    const patient = await this.PatientRepo.findOneBy({patientid});
    if(!patient){
        throw new HttpException('Not Found!', 404);
    }
    else  {
        this.PatientRepo.delete(patientid);
        throw new HttpException("Patient deleted Successfully!",200);
    }
}

async deletePatientlabById(testid:number): Promise<any> {
    const lab = await this.LabRepo.findOneBy({testid});
    if(!lab){
        throw new HttpException('Not Found!', 404);
    }
    else  {
        this.LabRepo.delete(testid);
        throw new HttpException("Lab deleted Successfully!",200);
    }
}

async putPatientById(
    patientid: number,
    propertyName: string,
    propertyValue: string,
): Promise<any>{
   const patient = await this.PatientRepo.update({patientid},
    {
        [propertyName]:  propertyValue,
    },
    );
    if(!patient){
        throw new HttpException("Not Found", 404);
    }
    return "Updated Successfully!";
}


async updateappointment(
    appointmentid: number,
    propertyName: string,
    propertyValue: string,
): Promise<any>{
   const appointment = await this.AppointmentRepo.update({appointmentid},
    {
        [propertyName]:  propertyValue,
    },
    );
    if(!appointment){
        throw new HttpException("Not Found", 404);
    }
    return "Updated Successfully!";
}

async sendEmail(mydata){
     return await this.mailerService.sendMail({
           to: mydata.email,
           subject: mydata.subject,
           text: mydata.text, 
         });
   
}


async deleteappointment(appointmentid: number): Promise<any> {
    const appointment = await this.AppointmentRepo.findOneBy({appointmentid});
    if(!appointment){
        throw new HttpException('Not Found!', 404);
    }
    else  {
        this.AppointmentRepo.delete(appointmentid);
        throw new HttpException("Appointment deleted Successfully!",200);
    }
}

async getPatientBylabid(testid: number): Promise<any> {
    const patient= await this.LabRepo.findOne({ 
        where: {testid:testid},
    relations: {
        patient: true,
    },
 });
 if(!patient || !patient[0]){
    throw new HttpException('Not Found!', 404);
}
else return patient;
}

async allappointment():Promise<any>{
    const appointments = await this.AppointmentRepo.find();
    if(!appointments || !appointments[0]){
        throw new HttpException('Not Found!', 404);
    }
    return appointments;
}


async getPatientByappointment(id: number): Promise<any> {
    const patient= await this.AppointmentRepo.find({ 
        where: {appointmentid:id},
    relations: {
        patient: true,
    },
 });
 if(!patient || !patient[0]){
    throw new HttpException('Not Found!', 404);
}
else return patient;
}


async getDoctorByappointment(id: number): Promise<any> {
    const doctor= await this.AppointmentRepo.find({ 
        where: {appointmentid:id},
    relations: {
        Doctor: true,
    },
 });
 if(!doctor || !doctor[0]){
    throw new HttpException('Not Found!', 404);
}
else return doctor;
}

async showpaymentbypatientid(id: number): Promise<any> {
    const doctor= await this.PaymentRepo.find({ 
        where: {patientid:id},
 });
 if(!doctor || !doctor[0]){
    throw new HttpException('Not Found!!', 404);
}
else return doctor;
}
updatelab(mydto:PatientFormlab,id):any {
    return this.LabRepo.update(id,mydto);
}



}