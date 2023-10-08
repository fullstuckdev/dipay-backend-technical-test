import { NestFactory } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { AppModule } from '../src/app.module';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    await MongooseModule.forRoot(process.env.DB_URI);
    const AdminModel = app.get('AdminModel');
    const adminData = { username: 'admin', password: 'dev' };
    const existingAdmin = await AdminModel.findOne({ username: adminData.username });

    if (!existingAdmin) {
      // Hash the password using bcrypt before storing it
      const hashedPassword = await bcrypt.hash(adminData.password, 10);
      
      // Update the password in adminData with the hashed password
      adminData.password = hashedPassword;

      // Insert data into the database
      await AdminModel.create(adminData);
      console.log('Seeding completed.');
    } else {
      console.log('Data already exists. No seeding needed.');
    }
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await app.close();
  }
}

// Run the seed function
seed();
