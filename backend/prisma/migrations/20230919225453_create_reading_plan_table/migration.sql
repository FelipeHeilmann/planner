-- CreateTable
CREATE TABLE "reading_plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plan_of" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "testament_id" INTEGER,
    "reading_goal_plan_per_day" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reading_plan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reading_plan" ADD CONSTRAINT "reading_plan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_plan" ADD CONSTRAINT "reading_plan_testament_id_fkey" FOREIGN KEY ("testament_id") REFERENCES "testament"("id") ON DELETE SET NULL ON UPDATE CASCADE;
