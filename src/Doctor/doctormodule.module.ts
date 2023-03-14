import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoctorController } from "./doctor.controller"
import { ServiceEntity } from "./doctorservice.entity";
import{ DoctorService} from "./doctorservice.service"

@Module({
imports: [TypeOrmModule.forFeature([ServiceEntity])],
controllers: [DoctorController],
providers: [DoctorService],

})

export class DoctorModule {}