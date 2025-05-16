import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottlerGuard } from './modules/common/guards/custom-throttler.guard';
import { FinancialEntriesModule } from './modules/financial-entries/financial-entries.module';
import { FinancialCategoriesModule } from './modules/financial-categories/financial-categories.module';
import 'reflect-metadata';

@Module({
  imports: [
    // typeOrm
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        // configuração do throttler (limite de requisições)
        ThrottlerModule.forRoot([{ ttl: 30000, limit: 60 }]),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
        synchronize: true, // ATENÇÃO: use false em produção!
      }),
    }),
    UsersModule,
    AuthModule,
    FinancialEntriesModule,
    FinancialCategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
