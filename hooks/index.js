function FilterComments(data) {
  const filter = data?.map((item) => item?.data?.map((msg) => msg?.message));

  return filter.flat(1);
}

function FetchAllComments(data) {
  const filter = data?.map((item) => item?.message);

  return filter.flat(1);
}

module.exports = { FilterComments, FetchAllComments };
