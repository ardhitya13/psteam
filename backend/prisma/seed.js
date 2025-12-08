const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  const exist = await prisma.user.findFirst({
    where: { role: "superadmin" }
  });

  if (!exist) {
    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: "superadmin@psteam.com",
        password: await bcrypt.hash("SuperAdmin12", 10),
        role: "superadmin",
      }
    });
  }

  console.log("SEED DONE: Superadmin created (if not exist)");
}

main()
  .catch(err => {
    console.error("SEED ERROR:", err);
  })
  .finally(() => prisma.$disconnect());
