import { CommonEntity } from '../common/entities/common.entity'; // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from 'src/users/users.entity';
import { BoardEntity } from 'src/borads/boards.entity';

@Entity({
  name: 'comments',
})
export class CommentEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  comment: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToOne(() => BoardEntity)
  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  board: BoardEntity;
}
