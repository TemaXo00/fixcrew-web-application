import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, Max } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  get skip(): number {
    const page = this.page || 1;
    const limit = this.limit || 10;
    return (page - 1) * limit;
  }

  get take(): number {
    return this.limit || 10;
  }

  get currentPage(): number {
    return this.page || 1;
  }

  get currentLimit(): number {
    return this.limit || 10;
  }
}

export class PaginatedResponseDto<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  search: string | null;

  constructor(
    items: T[],
    total: number,
    pagination: PaginationDto,
    search: string | null = null,
  ) {
    this.items = items;
    this.page = pagination.currentPage;
    this.limit = pagination.currentLimit;
    this.total = total;
    this.totalPages = Math.ceil(total / pagination.currentLimit);
    this.hasNext = this.page < this.totalPages;
    this.hasPrev = this.page > 1;
    this.search = search;
  }
}
