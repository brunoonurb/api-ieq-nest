import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/core/auth/auth.module';
import { CnhController } from './aplicacao/controller/Cnh.controller';
import { CnhService } from './aplicacao/service/Cnh.service';
import { ConsultaDemandaService } from './aplicacao/service/ConsultaDemanda.service';
import { MinioRepository } from './infra/repository/minio/Minio.repository';
import { CnhRepository } from './infra/repository/mysql/Cnh.repository';
import { CnhHistoricoConsultaRepository } from './infra/repository/mysql/CnhHistoricoConsulta.repository';
import { CnhImagemMinioaRepository } from './infra/repository/mysql/CnhImagemMinio.repository';
import { ConsultaDemandaRepository } from './infra/repository/mysql/ConsultaDemanda.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
    ]),
  ],
  controllers: [],
  providers: [],
})
export class CnhModule {}
