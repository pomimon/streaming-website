import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Stream } from "./Stream";

@Entity("StreamInfo")
export class StreamInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Stream, (stream) => stream.snapshot)
  @JoinColumn({ name: "stream" })
  stream: "Stream";
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  published_at: string;
  @Column()
  channel_id: string;
  @Column()
  channel_title: string;
  @Column()
  preview_default: string;
  @Column()
  preview_medium: string;
  @Column()
  preview_high: string;
  @Column()
  preview_standard: string;
  @Column()
  preview_maxres: string;
  @Column()
  live_broadcast_content: string;
}
