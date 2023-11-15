import prisma from "~/server/prisma";

export default defineEventHandler(async (event) => {
  const params = getQuery(event);

  const page = Number(params.page) || 1;
  const perPage = 30;

  const teams = await prisma.team.findMany({
    skip: perPage * (page - 1),
    take: perPage,
  });

  const teamsCount = await prisma.team.count({});

  return {
    success: true,
    page: page,
    perPage: perPage,
    maxPages: Math.ceil(teamsCount / perPage),
    maxItems: teamsCount,
    teams: teams,
  };
});
