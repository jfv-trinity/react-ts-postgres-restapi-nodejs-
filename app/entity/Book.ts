import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Bookchapters } from "./Bookchapters";
import { Bookgenres } from "./Bookgenres";

@Index("book_book_title_key", ["bookTitle"], { unique: true })
@Index("book_pkey", ["id"], { unique: true })
@Entity("book", { schema: "public" })
export class Book {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "book_title",
    unique: true,
    length: 150,
  })
  bookTitle: string;

  @Column("character varying", { name: "prologue", nullable: true })
  prologue: string | null;

  @Column("timestamp with time zone", { name: "publish_date" })
  publishDate: Date;

  @Column("timestamp with time zone", { name: "date_updated", nullable: true })
  dateUpdated: Date | null;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn([{ name: "author", referencedColumnName: "id" }])
  author: User;

  @OneToMany(() => Bookchapters, (bookchapters) => bookchapters.book)
  bookchapters: Bookchapters[];

  @OneToMany(() => Bookgenres, (bookgenres) => bookgenres.book)
  bookgenres: Bookgenres[];
}
