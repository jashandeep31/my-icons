-- DropForeignKey
ALTER TABLE "Icon" DROP CONSTRAINT "Icon_userId_fkey";

-- AddForeignKey
ALTER TABLE "Icon" ADD CONSTRAINT "Icon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
