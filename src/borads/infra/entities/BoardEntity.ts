import { CommonEntity } from '../../../common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { UserEntity } from 'src/users/infra/entity/users.entity';
import { BoardDataEntity } from 'src/borads/infra/entities/BoardsDataEntity';
import { LocationEntity } from 'src/borads/infra/entities/BoardsLoationDataEntity';
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
      cascade: true,
    },
  )
  boardData: BoardDataEntity[];

  @OneToMany(
    () => LocationEntity,
    (location: LocationEntity) => location.board,
    {
      cascade: true,
    },
  )
  location: LocationEntity[];

  @OneToMany(() => LikeEntity, (like: LikeEntity) => like.board, {
    cascade: true,
  })
  like: LikeEntity[];

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.board, {
    cascade: true,
  })
  comment: CommentEntity[];
  static id: string;
}
