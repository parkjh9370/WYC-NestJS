import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserEntity } from 'src/users/infra/entity/users.entity';
import { BoardEntity } from 'src/borads/infra/entities/BoardEntity';
import { CommonEntity } from 'src/common/entities/common.entity';

@Entity({
  // 테이블 명
  name: 'likes',
})
// CommonEntitiy 상속
export class LikeEntity extends CommonEntity {
  // @OneToOne(() => UserEntity)
  // @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  // user: UserEntity;
  // @OneToOne(() => BoardEntity)
  // @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  // board: BoardEntity;
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.like, {
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
  @ManyToOne(() => BoardEntity, (board: BoardEntity) => board.like, {
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
