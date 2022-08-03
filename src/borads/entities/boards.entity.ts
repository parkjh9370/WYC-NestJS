import { CommonEntity } from '../../common/entities/common.entity'; // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
// import { VisitorEntity } from '../visitors/visitors.entity';
import { UserEntity } from 'src/users/users.entity';
import { BoardDataEntity } from 'src/borads/entities/board-datas.entity';
import { LocationEntity } from 'src/borads/entities/locations.entity';
// import { TagEntity } from 'src/tags/tags.entity';

@Entity({
  // 테이블 명
  name: 'boards',
})
// CommonEntitiy 상속
export class BoardEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @Column({ type: 'int', nullable: true })
  rating: number;

  //* Relation */
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.board, {
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

  @OneToMany(
    () => BoardDataEntity,
    (boardData: BoardDataEntity) => boardData.board,
    {
      cascade: true, // 사용자를 통해 블로그가 추가, 수정, 삭제되고 사용자가 저장되면 추가된 블로그도 저장된다.
    },
  )
  boardData: BoardDataEntity[];

  @OneToMany(
    () => LocationEntity,
    (location: LocationEntity) => location.board,
    {
      cascade: true, // 사용자를 통해 블로그가 추가, 수정, 삭제되고 사용자가 저장되면 추가된 블로그도 저장된다.
    },
  )
  location: LocationEntity[];

  //   @ManyToMany(() => TagEntity, (tag: TagEntity) => tag.blogs, {
  //     cascade: true, // 블로그를 통해 태그가 추가, 수정, 삭제되고 블로그를 저장하면 태그도 저장된다.
  //   })
  //   @JoinTable({
  //     // table
  //     name: 'BLOG_TAG',
  //     joinColumn: {
  //       name: 'blog_id',
  //       referencedColumnName: 'id', // 자기 자신의 id
  //     },
  //     inverseJoinColumn: {
  //       name: 'tag_id',
  //       referencedColumnName: 'id',
  //     },
  //   })
  //   tags: TagEntity[];

  //   @OneToMany(() => VisitorEntity, (visitor: VisitorEntity) => visitor.blog, {
  //     cascade: true,
  //   })
  //   visitors: VisitorEntity[];
}
