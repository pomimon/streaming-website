import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { StreamInfo } from "./StreamInfo";

@Entity("Stream")
export class Stream {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  provider: number;
  @Column()
  resource: string;
  @Column()
  valid: boolean;
  @OneToOne(() => StreamInfo, (info) => info.stream, {
    eager: true,
  })
  snapshot: StreamInfo;
}
