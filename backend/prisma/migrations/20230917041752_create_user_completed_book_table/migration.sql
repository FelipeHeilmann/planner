-- CreateTable
CREATE TABLE "UserCompletedBook" (
    "id" TEXT NOT NULL,
    "book" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "completed" INTEGER NOT NULL,

    CONSTRAINT "UserCompletedBook_pkey" PRIMARY KEY ("id")
);
