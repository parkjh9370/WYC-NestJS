import { AggregateRoot } from 'src/common/core/domain/AggregateRoot';
import { Result } from 'src/common/core/presentation/Result';

export interface BoardLocationProps {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  latitude: string;
  longitude: string;
  roadAdd: null | string;
  lotAdd: string;
}

export class BoardLocation extends AggregateRoot<BoardLocationProps> {
  private constructor(props: BoardLocationProps) {
    super(props);
  }

  static create(props: BoardLocationProps): Result<BoardLocation> {
    return Result.ok(new BoardLocation(props));
  }

  static createNew(props: BoardLocationProps): Result<BoardLocation> {
    return this.create({ ...props });
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

  get latitude(): string {
    return this.props.latitude;
  }

  get longitude(): string {
    return this.props.longitude;
  }

  get roadAdd(): string {
    return this.props.roadAdd;
  }

  get lotAdd(): string {
    return this.props.lotAdd;
  }
}
