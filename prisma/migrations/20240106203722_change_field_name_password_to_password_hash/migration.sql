/*
  Warnings:

  - You are about to drop the column `password` on the `Org` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `Org` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Org" DROP COLUMN "password",
ADD COLUMN     "password_hash" TEXT NOT NULL;
