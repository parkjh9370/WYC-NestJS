import { BoardEntity } from './../borads/boards.entity';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from '../common/entities/common.entity'; // ormconfig.json에서 파싱 가능하도록 상대 경로로 지정
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
// import { BlogEntity } from '../blogs/blogs.entity';
// import { ProfileEntity } from '../profiles/profiles.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
}) // USER : 테이블 명
export class UserEntity extends CommonEntity {
  @IsEmail({}, { message: '올바른 이메일을 작성해주세요.' })
  @IsNotEmpty({ message: '이메일을 작성해주세요.' })
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Exclude() // 최종 결과물 받을 때 해당 엔티티 빼준다.
  @IsNotEmpty({ message: '비밀번호를 작성해주세요.' })
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '이름을 작성해주세요.' })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '닉네임을 작성해주세요.' })
  @Column({ type: 'varchar', nullable: false })
  nickname: string;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  profile: string;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  provider: string;

  @IsString()
  @Column({ type: 'varchar', nullable: true })
  snsid: string;

  //* Relation */

  // UserEntity에 profile_id 생성, Profile 테이블 id와 연결
  // User를 통해 Profile에 접근하는 경우
  //   @OneToOne(() => ProfileEntity) // 단방향 연결, 양방향도 가능
  //   @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  //   profile: ProfileEntity;

  // blog에 있는 author칼럼과 연결
  @OneToMany(() => BoardEntity, (board: BoardEntity) => board.user, {
    cascade: true, // 사용자를 통해 블로그가 추가, 수정, 삭제되고 사용자가 저장되면 추가된 블로그도 저장된다.
  })
  board: BoardEntity[];
}

/*
CashCade : true 옵션
const author = await User.findOne( { id: '...' } )
author.blogs.push(new BlogEntity(...))
await author.save()
// cascade: true -> User의 author만 저장해도 blog author도 같이 저장된다.
*/
