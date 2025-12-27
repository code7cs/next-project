-- First, handle the foreign key constraints
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- Convert all id columns from INTEGER to TEXT (UUID) in the correct order
-- 1. Account.userId
ALTER TABLE "Account" ALTER COLUMN "userId" TYPE TEXT;
-- 2. Session.userId
ALTER TABLE "Session" ALTER COLUMN "userId" TYPE TEXT;
-- 3. User.id
ALTER TABLE "User" ALTER COLUMN "id" TYPE TEXT;

-- Re-add the foreign key constraints with matching types
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
