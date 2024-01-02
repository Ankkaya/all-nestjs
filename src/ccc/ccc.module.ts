import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './ccc.module-definition';
import { CccController } from './ccc.controller';

@Module({
  controllers: [CccController],
})
export class CccModule extends ConfigurableModuleClass {}
