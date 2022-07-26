import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("library_pkey", ["id"], { unique: true })
@Entity("library", { schema: "public" })
export class Library {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "book_title", length: 150 })
  bookTitle: string;

  @Column("integer", { name: "book_id" })
  bookId: number;

  @ManyToOne(() => User, (user) => user.libraries)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
