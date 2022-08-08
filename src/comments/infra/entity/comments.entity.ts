import { CommonEntity } from '../../../common/entities/common.entity'; // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { BoardEntity } from 'src/borads/infra/entities/BoardEntity';

@Entity({
  name: 'comments',
})
export class CommentEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  comment: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'userId',
      referencedColumnName: 'id',
    },
  ])
  user: UserEntity;

  @ManyToOne(() => BoardEntity, (board: BoardEntity) => board.comment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'boardId',
      referencedColumnName: 'id',
    },
  ])
  board: BoardEntity;
}
