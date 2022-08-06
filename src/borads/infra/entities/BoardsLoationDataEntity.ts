import { CommonEntity } from '../../../common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BoardEntity } from 'src/borads/infra/entities/BoardEntity';

@Entity({
  name: 'locations',
})
export class LocationEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  latitude: string;

  @Column({ type: 'varchar', nullable: false })
  longitude: string;

  @Column({ type: 'varchar', nullable: true })
  roadAdd: string;

  @Column({ type: 'varchar', nullable: true })
  lotAdd: string;

  //* Relation */
  @ManyToOne(() => BoardEntity, (board: BoardEntity) => board.location, {
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
