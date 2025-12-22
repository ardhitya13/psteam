import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const totalUsers = await prisma.user.count();

  const totalProjectPending = await prisma.projectsubmission.count({
    where: { status: "pending" },
  });

  const totalProjectVerified = await prisma.projectsubmission.count({
    where: { status: "verified" },
  });

  const totalProduct = await prisma.product.count();

  const totalTraining = await prisma.training.count();

  const totalTrainingPending = await prisma.trainingregistration.count({
    where: { status: "pending" },
  });

  const totalTrainingVerified = await prisma.trainingregistration.count({
    where: { status: "verified" },
  });

  const totalTeamProject = await prisma.teamproject.count();
  const totalTeamMember = await prisma.teammember.count();

  const educationHistory = await prisma.educationhistory.count();
  const research = await prisma.research.count();
  const community = await prisma.communityservice.count();
  const scientificWork = await prisma.scientificwork.count();
  const haki = await prisma.intellectualproperty.count();

  return NextResponse.json({
    totalUsers,
    totalProjectPending,
    totalProjectVerified,
    totalProduct,
    totalTraining,
    totalTrainingPending,
    totalTrainingVerified,
    totalTeamProject,
    totalTeamMember,
    educationHistory,
    research,
    community,
    scientificWork,
    haki,
  });
}
