import { BoardEntity } from '../../../borads/infra/entities/BoardEntity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from '../../../common/entities/common.entity'; // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { LikeEntity } from 'src/likes/infra/entity/likes.entity';
import { CommentEntity } from 'src/comments/infra/entity/comments.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
}) // USER : 테이블 명
export class UserEntity extends CommonEntity {
  @IsEmail({}, { message: '올바른 이메일을 작성해주세요.' })
  @IsNotEmpty({ message: '이메일을 작성해주세요.' })
  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @IsNotEmpty({ message: '비밀번호를 작성해주세요.' })
  @Column({ type: 'varchar', nullable: true })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '이름을 작성해주세요.' })
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '닉네임을 작성해주세요.' })
  @Column({ type: 'varchar', nullable: true })
  nickname: string;

  @IsString()
  @Column({
    type: 'varchar',
    default: 'http://localhost:8000/media/image/12345.png',
  })
  profile: string;

  @IsString()
  @Column({ type: 'varchar', default: 'local' })
  provider: string;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  snsid: string;

  /** Relation */

  @OneToMany(() => BoardEntity, (board: BoardEntity) => board.user, {
    cascade: true,
  })
  board: BoardEntity[];

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.user, {
    cascade: true,
  })
  like: LikeEntity[];

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.user, {
    cascade: true,
  })
  comment: CommentEntity[];
}
