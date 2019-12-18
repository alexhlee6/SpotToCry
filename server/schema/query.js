async function feed(parent, args, context) {
  const songs = await context.prisma.songs({
    where: {
      OR: [
        { title_contains: args.filter }
      ],
    },
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  })
  return {
    songs
  }
}

module.exports = {
  feed,
}