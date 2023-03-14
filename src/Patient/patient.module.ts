import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { AppointmentEntity, LabEntity, PatientEntity, PaymentEntity } from './patiententity.entity';
import { MailerModule } from "@nestjs-modules/mailer";
import { ServiceEntity } from 'src/Doctor/doctorservice.entity';

@Module({
  imports: [
      MailerModule.forRoot({
          transport: {
            host: 'smtp.gmail.com',
                     port: 465,
                     ignoreTLS: true,
                     secure: true,
                     auth: {
                         user: 'rokomiislamemon5@gmail.com',
                         pass: 'vmvfqnxnejbyjpbm'
                     },
                    }
        }),
  
  TypeOrmModule.forFeature([PatientEntity, LabEntity, AppointmentEntity,ServiceEntity,PaymentEntity])],
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule {}