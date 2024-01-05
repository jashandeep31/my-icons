/*
  Warnings:

  - The values [windows,macos] on the enum `Paltform` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `userId` to the `BaseIcons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastLogin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishedIcons` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterEnum
BEGIN;
CREATE TYPE "Paltform_new" AS ENUM ('WINDOWS', 'MACOS', 'OTHER');
ALTER TABLE "BaseIcons" ALTER COLUMN "paltform" TYPE "Paltform_new" USING ("paltform"::text::"Paltform_new");
ALTER TYPE "Paltform" RENAME TO "Paltform_old";
ALTER TYPE "Paltform_new" RENAME TO "Paltform";
DROP TYPE "Paltform_old";
COMMIT;

-- AlterTable
ALTER TABLE "BaseIcons" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "paltform" SET DEFAULT 'OTHER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLogin" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "publishedIcons" INTEGER NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "BaseIcons" ADD CONSTRAINT "BaseIcons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
