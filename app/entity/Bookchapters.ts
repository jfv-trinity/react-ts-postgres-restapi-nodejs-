import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";

@Index("bookchapters_pkey", ["id"], { unique: true })
@Entity("bookchapters", { schema: "public" })
export class Bookchapters {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "chapter_title",
    nullable: true,
    length: 150,
  })
  chapterTitle: string | null;

  @Column("character varying", {
    name: "context",
    nullable: true,
    length: 50000,
  })
  context: string | null;

  @ManyToOne(() => Book, (book) => book.bookchapters)
  @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
  book: Book;
}
