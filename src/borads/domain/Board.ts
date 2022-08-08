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

export class Board extends AggregateRoot<BoardProps> {
  private constructor(props: BoardProps) {
    super(props);
  }

  static create(props: BoardProps): Result<Board> {
    return Result.ok(new Board(props));
  }

  static createNew(props: BoardProps): Result<Board> {
    return this.create({ ...props });
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
