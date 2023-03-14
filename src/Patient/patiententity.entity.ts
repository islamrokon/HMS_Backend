import { ServiceEntity } from 'src/Doctor/doctorservice.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinTable, BaseEntity, OneToOne, Relation, JoinColumn } from 'typeorm';

@Entity("patient")
export class PatientEntity {

  @PrimaryGeneratedColumn()
  patientid: number;

  @Column()
  patientname: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  picture: string;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.patient)
  appointment: AppointmentEntity[];

  @OneToMany(() => LabEntity, (lab) => lab.patient)
  labs: LabEntity[];
}

@Entity("lab")
export class LabEntity {

  @PrimaryGeneratedColumn()
  testid: number;

  @Column()
  patientname: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  testname: string;

 @Column()
  prescription: string;

  @ManyToOne(() => PatientEntity, (patient) => patient.labs)
  patient: PatientEntity
}

@Entity("appointment")
export class AppointmentEntity {

  @PrimaryGeneratedColumn()
  appointmentid: number;

  @Column()
  patientname: string;

  @Column()
  age: number

  @Column()
  departmentname: string;

  @Column()
  doctorname: string;

  @Column()
  bloodgroup: string;

  @Column()
  date: Date;

  @ManyToOne(() => ServiceEntity, (doctor) => doctor.appointment,
  {cascade: true,
  })
  Doctor: ServiceEntity

  @ManyToOne(() => PatientEntity, (patient) => patient.appointment)
  patient: PatientEntity

}


@Entity("payment")
export class PaymentEntity {

  @PrimaryGeneratedColumn()
  paymententid: number;

  @Column()
  patientname: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  amount: string;
  

  @OneToOne(() => PatientEntity, { "cascade": true })
  @JoinColumn()
  patientpay: PatientEntity


}
