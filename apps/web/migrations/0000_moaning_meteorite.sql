CREATE TYPE "public"."annotator_options" AS ENUM('human', 'ai');--> statement-breakpoint
CREATE TYPE "public"."authorization_options" AS ENUM('grant', 'deny');--> statement-breakpoint
CREATE TYPE "public"."redeem_type_options" AS ENUM('annotation', 'vote');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "annotation" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255),
	"image_id" varchar(255) NOT NULL,
	"latency" real NOT NULL,
	"annotator" "annotator_options" NOT NULL,
	"label" varchar(255) NOT NULL,
	"inquiry" text NOT NULL,
	"duration" real,
	"quick" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "redeem" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"secret" varchar(255) NOT NULL,
	"type" "redeem_type_options" NOT NULL,
	"last_resent_at" timestamp DEFAULT now() NOT NULL,
	"confirmed_at" timestamp,
	"requested_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vote" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"annotation" uuid NOT NULL,
	"authorization" "authorization_options" NOT NULL,
	"duration" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vote" ADD CONSTRAINT "vote_annotation_annotation_id_fk" FOREIGN KEY ("annotation") REFERENCES "public"."annotation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
