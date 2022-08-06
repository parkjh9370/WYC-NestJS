import { CommonEntity } from '../../../common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { UserEntity } from 'src/users/infra/entity/users.entity';
import { BoardDataEntity } from 'src/borads/infra/entities/board-datas.entity';
import { LocationEntity } from 'src/borads/infra/entities/locations.entity';
import { LikeEntity } from 'src/likes/infra/entity/likes.entity';
import { CommentEntity } from 'src/comments/infra/entity/comments.entity';

@Entity({
  name: 'boards',
})
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
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'userId',
      referencedColumnName: 'id',
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

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.board, {
    cascade: true, // 사용자를 통해 블로그가 추가, 수정, 삭제되고 사용자가 저장되면 추가된 블로그도 저장된다.
  })
  like: LikeEntity[];

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.board, {
    cascade: true, // 사용자를 통해 블로그가 추가, 수정, 삭제되고 사용자가 저장되면 추가된 블로그도 저장된다.
  })
  comment: CommentEntity[];

  // @ManyToMany(() => UserEntity, (user: UserEntity) => user.boards)
  // users: UserEntity[];

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
