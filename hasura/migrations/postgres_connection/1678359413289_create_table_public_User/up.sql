CREATE TABLE "public"."User" ("id" serial NOT NULL, "first_name" text NOT NULL, "last_name" text NOT NULL, "gender" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("gender") REFERENCES "public"."Gender"("value") ON UPDATE restrict ON DELETE restrict);COMMENT ON TABLE "public"."User" IS E'Users table';