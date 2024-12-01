import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constant';
import { UsersModule } from 'src/Usuario/usuario.module';
import { RolesGuard } from './guard/roles.guard';


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}