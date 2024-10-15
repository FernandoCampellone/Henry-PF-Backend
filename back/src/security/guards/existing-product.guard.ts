import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';

import { ProductsService } from '../../products/products.service';

@Injectable()
export class ExistingProductGuard implements CanActivate {
  constructor(private readonly prodSv: ProductsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const prodId = request.params.id;
    try {
      const product = await this.prodSv.findOne(prodId);
      if (!product) {
        return false;
      }
      return true;
    } catch {
      throw new BadRequestException('error');
    }
  }
}
