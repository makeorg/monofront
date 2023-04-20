import { PrismaClient } from '@prisma/client';
import arteJson from '@make.org/content/prisma/fixtures/example.json';
// initialize Prisma Client

const prisma = new PrismaClient();

async function main() {
  // create two dummy articles

  const post1 = await prisma.consultationResult.upsert({
    where: { slug: 'local_test' },
    update: {},

    create: {
      slug: 'local_test',
      question_id: 'XXXXquestionId',
      author_id: 'XXXXauthorId',
      data: arteJson,
    },
  });

  console.log({ post1 });
}

// execute the main function

main()
  .catch((e) => {
    console.error(e);

    process.exit(1);
  })

  .finally(async () => {
    // close Prisma Client at the end

    await prisma.$disconnect();
  });
