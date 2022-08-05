import { CommonEntity } from '../../../common/entities/common.entity'; // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { BoardEntity } from 'src/borads/infra/entities/boards.entity';

@Entity({
  name: 'comments',
})
export class CommentEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  comment: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comment, {
    onDelete: 'CASCADE', // 사용자가 삭제되면 블로그도 삭제된다.
  })
  @JoinColumn([
    // foreignkey 정보들, 연결도 UserEntity 에 대한 정보들을 명시해준다.
    {
      name: 'userId' /* db에 저장되는 필드 이름 */,
      referencedColumnName: 'id' /* USER의 id */,
    },
  ])
  user: UserEntity;

  @ManyToOne(() => BoardEntity, (board: BoardEntity) => board.comment, {
    onDelete: 'CASCADE', // 사용자가 삭제되면 블로그도 삭제된다.
  })
  @JoinColumn([
    // foreignkey 정보들, 연결도 UserEntity 에 대한 정보들을 명시해준다.
    {
      name: 'boardId' /* db에 저장되는 필드 이름 */,
      referencedColumnName: 'id' /* USER의 id */,
    },
  ])
  board: BoardEntity;
}
