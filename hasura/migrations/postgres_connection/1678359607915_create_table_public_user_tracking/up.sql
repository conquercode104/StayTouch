CREATE TABLE "public"."user_tracking" ("id" serial NOT NULL, "user_id" integer NOT NULL, "lat" numeric NOT NULL, "lng" numeric NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON UPDATE restrict ON DELETE restrict);
