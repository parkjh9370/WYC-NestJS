// BoardDataEntity {
//   id: '079891b2-d884-4886-8fb1-faa235899eea',
//   createdAt: 2022-08-06T11:24:15.059Z,
//   updatedAt: 2022-08-06T11:24:15.059Z,
//   deletedAt: null,
//   area: '서울',
//   wifi: '가능',
//   parking: '여유',
//   electricity: '가능',
//   toiletType: '양호'
// }

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
