import { AggregateRoot } from 'src/common/core/domain/AggregateRoot';
import { Result } from 'src/common/core/presentation/Result';

export interface BoardDataProps {
  id: string;
  createdAt: any;
  updatedAt: any;
  deletedAt: any | null;
  area: string;
  wifi: string;
  parking: string;
  electricity: string;
  toiletType: string;
}

export class BoardData extends AggregateRoot<BoardDataProps, string> {
  private constructor(props: BoardDataProps, id: string) {
    super(props, id);
  }

  static create(props: BoardDataProps, id: string): Result<BoardData> {
    return Result.ok(new BoardData(props, id));
  }

  static createNew(props: BoardDataProps): Result<BoardData> {
    return this.create({ ...props }, '0');
  }

  get id(): string {
    return this.props.id;
  }

  get createdAt(): any {
    return this.props.createdAt;
  }

  get updatedAt(): any {
    return this.props.updatedAt;
  }

  get deletedAt(): any {
    return this.props.deletedAt;
  }

  get area(): string {
    return this.props.area;
  }

  get wifi(): string {
    return this.props.wifi;
  }

  get parking(): string {
    return this.props.parking;
  }

  get electricity(): string {
    return this.props.electricity;
  }

  get toiletType(): string {
    return this.props.toiletType;
  }
}
