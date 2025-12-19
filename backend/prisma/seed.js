const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  try {
    // Cek apakah superadmin sudah ada
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
      console.log("✔ Superadmin created.");
    } else {
      console.log("ℹ Superadmin already exists, skipping creation.");
    }

  } catch (error) {
    console.error("SEED ERROR:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

