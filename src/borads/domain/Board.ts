import { AggregateRoot } from 'src/common/core/domain/AggregateRoot';
import { Result } from 'src/common/core/presentation/Result';

interface BoardProps {
  id: string;
  createdAt: any;
  title: string;
  content: string;
  picture: string;
  rating: number;
  user: UserNameProfile;
}

interface UserNameProfile {
  nickname: string;
  profile: string;
}

export class Board extends AggregateRoot<BoardProps, string> {
  private constructor(props: BoardProps, id: string) {
    super(props, id);
  }

  static create(props: BoardProps, id: string): Result<Board> {
    return Result.ok(new Board(props, id));
  }

  static createNew(props: BoardProps): Result<Board> {
    return this.create({ ...props }, '0');
  }

  get id(): string {
    return this.props.id;
  }

  get createdAt(): any {
    return this.props.createdAt;
  }

  get title(): string {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get picture(): string {
    return this.props.picture;
  }

  get rating(): number {
    return this.props.rating;
  }

  get user(): UserNameProfile {
    return this.props.user;
  }
}
