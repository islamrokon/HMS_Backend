import { AppointmentEntity } from 'src/Patient/patiententity.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany }from 'typeorm';
@Entity("Doctor")
export class ServiceEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()name: string;
     @Column()email: string;
    @Column()address: string;

    @OneToMany(() => AppointmentEntity, (appointment) => appointment.Doctor)
    appointment: AppointmentEntity[];
}