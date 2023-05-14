import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { adminmodule } from './Admin/adminmodule.module';
import { DoctorModule } from './Doctor/doctormodule.module';
import { EmployeeModule } from './Employee/employeemodule.module';
import { PatientModule } from './Patient/patient.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [adminmodule,DoctorModule,EmployeeModule, PatientModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'containers-us-west-193.railway.app',
      port: 6971,
      username: 'postgres',
      password: '101253',
      database: 'railway',
      autoLoadEntities: true,
      
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
      synchronize: true, 
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
