-- DropIndex
DROP INDEX "Otp_email_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastname" DROP NOT NULL,
ALTER COLUMN "mobile" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "profile" DROP NOT NULL,
ALTER COLUMN "firstName" DROP NOT NULL;
