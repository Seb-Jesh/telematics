import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // cleanup the existing database
  await prisma.platform.deleteMany({}).catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.platform.create({
    data: {
        title: "Wialon",
        url: "https://hosting.wialon.eu/?lang=en",
    },
  });

  await prisma.manufacturer.create({
    data: {
      title: "iStartek Technology Co. Ltd",
      url: "https://www.istartek.com/",
    },
  });

  await prisma.provider.create({
    data: {
      title: "Justworx",
      url: "https://portal.justworx.store",
      apn: "Justworx",
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });