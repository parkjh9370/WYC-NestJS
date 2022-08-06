// LocationEntity {
//   id: '2ad4e291-2fbb-4463-9cc6-6915b198dfe3',
//   createdAt: 2022-08-06T11:24:15.061Z,
//   updatedAt: 2022-08-06T11:24:15.061Z,
//   deletedAt: null,
//   latitude: '37.821044375769425',
//   longitude: '127.51742406391095',
//   roadAdd: null,
//   lotAdd: '경기 가평군 가평읍 대곡리 43-1'
// }

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

export class BoardLocation extends AggregateRoot<BoardLocationProps, string> {
  private constructor(props: BoardLocationProps, id: string) {
    super(props, id);
  }

  static create(props: BoardLocationProps, id: string): Result<BoardLocation> {
    return Result.ok(new BoardLocation(props, id));
  }

  static createNew(props: BoardLocationProps): Result<BoardLocation> {
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
