import { CommonEntity } from '../../../common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BoardEntity } from 'src/borads/infra/entities/BoardEntity';

@Entity({
  name: 'boardDatas',
})
export class BoardDataEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  area: string;

  @Column({ type: 'varchar', nullable: false })
  wifi: string;

  @Column({ type: 'varchar', nullable: false })
  parking: string;

  @Column({ type: 'varchar', nullable: true })
  electricity: string;

  @Column({ type: 'varchar', nullable: true })
  toiletType: string;

  //* Relation */
  @ManyToOne(() => BoardEntity, (board: BoardEntity) => board.boardData, {
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
