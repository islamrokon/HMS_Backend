import { Controller, Get, Post, Put, Delete, Body,Param, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Session, UnauthorizedException, UseGuards, Res } from '@nestjs/common';
import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, ParseIntPipe } from '@nestjs/common/pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppointmnetForm, PatientForm, PatientFormlab } from './patient.dto';
import { PatientService} from './patient.service'
import { AppointmentEntity, LabEntity, PatientEntity } from './patiententity.entity';
import { SessionGuard } from './session.guard';
@Controller('patient')
export class PatientController {
    constructor (private patientService: PatientService){}

    @Get('/allpatient')
    //@UseGuards(SessionGuard)
    async getPatients() {
        const patients = await this.patientService.getPatients();
        return patients;
    }

    @Get('/findoctor')
    getAdminByIDName(@Query() qry: any): any {
      return this.patientService.getUserByIDName(qry);
    }

    @Get('/showalldoctor')
    //@UseGuards(SessionGuard)
    async showalldoctor() {
        const doctors = await this.patientService.showalldoctor();
        return doctors;
    }
    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: './prescriptions' })
    }

    @Get('/patient/:patientid')
    //@UseGuards(SessionGuard)
    async getPatientById(@Param('patientid') patientid) {
        const patient = await this.patientService.getPatientById(patientid);
        return patient;
    }

    @Get('/patientlab/:testid')
    //@UseGuards(SessionGuard)
    async getPatientlabById(@Param('testid') testid) {
        const patient = await this.patientService.getPatientlabById(testid);
        return patient;
    }

    @Get('/labs')
    //@UseGuards(SessionGuard)
    async labs() {
        const labs = await this.patientService.labs();
        return labs;
    }

    @Post('/signup')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('picture',
    {storage:diskStorage({
    destination: './uploads',
   filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
   }
   })
   }))
    async Signup(@Body() mydto: PatientForm,@UploadedFile(  new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1600000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
      }),) file: Express.Multer.File){
      
      mydto.picture = file.filename;

        const patient = await this.patientService.Signup(mydto);
        return patient;
    }

   @Get('/signin')
    async signin(@Session() session, @Body() mydto:PatientForm)
    {
      const found = this.patientService.signin(mydto);
    if(await found === 1)
    {
      session.email = mydto.email;
    
      console.log(session.email);
      return {message:"You have logged in successfully!"};
    
    }
    else
    {
      return {message:"Please provide the correct password!"};
    }
  }

  @Get('/signout')
  @UseGuards(SessionGuard)
 signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
}
    
    @Post('/booklab')
   // @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('prescription',
    {storage:diskStorage({
    destination: './prescriptions',
   filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
   }
   })
   }))
    async BookLab(@Body() labdto: PatientFormlab,@UploadedFile(  new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1600000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
      }),) file: Express.Multer.File):Promise<LabEntity>{
      
        labdto.prescription = file.filename;
      return await this.patientService.booklab(labdto);
    }

    @Post('/takeappoinment')
   // @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    async addAppointment(@Body() mydtappoint: AppointmnetForm):Promise<AppointmentEntity> {
        const appointment = await this.patientService.addAppointment(mydtappoint);
        return appointment;
    }

    @Delete("/deletepatient/:id")
    @UseGuards(SessionGuard)
    public async deletePatientById(@Param('id') id: number) {
        const patient = await this.patientService.deletePatientById(id);
        return patient;
    }

    @Delete("/deletelab/:id")
    @UseGuards(SessionGuard)
    public async deletePatientlabById(@Param('id') id: number) {
        const patient = await this.patientService.deletePatientlabById(id);
        return patient;
    }

    @Put("/updatepatient/:id")
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    public async putPatientById(@Param('id', ParseIntPipe) id: number, @Query() query){
        const propertyName = query.property_name;
        const propertyValue = query.property_value;
        return this.patientService.putPatientById(id, propertyName, propertyValue);
    }

    @Put("/updateappointment/:id")
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    public async updateappointment(@Param('id', ParseIntPipe) id: number, @Query() query){
        const propertyName = query.property_name;
        const propertyValue = query.property_value;
        return this.patientService.updateappointment(id, propertyName, propertyValue);
    }

    @Post('/sendmail')
    sendEmail(@Body() mydata){
    return this.patientService.sendEmail(mydata);
}

@Delete("/deleteappointment/:id")
@UseGuards(SessionGuard)
public async deleteappointment(@Param('id') id: number) {
    const patient = await this.patientService.deleteappointment(id);
    return patient;
}

@Get("/getPatientBylabid/:id")
@UseGuards(SessionGuard)
public async getPatientBylabid(@Param('id') id: number){
  const patient = await this.patientService.getPatientBylabid(id);
  return patient;
}


@Get("allappointment")
@UseGuards(SessionGuard)
    async allappointment() {
        const appointments = await this.patientService.allappointment();
        return appointments;
    }


    @Get("/getPatientByappointment/:id")
    //@UseGuards(SessionGuard)
public async getPatientByappointment(@Param('id') id: number){
  const patient = await this.patientService.getPatientByappointment(id);
  return patient;
}

@Get("/getDoctorByappointment/:id")
@UseGuards(SessionGuard)
public async getDoctorByappointment(@Param('id') id: number){
  const doctor = await this.patientService.getDoctorByappointment(id);
  return doctor;
}
 
@Get("showpaymentbypatientid/:id")
//@UseGuards(SessionGuard)
public async showpaymentbypatientid(@Param('id')id:number){
  const payment = await this.patientService.showpaymentbypatientid(id);
  return payment;
}



}
