const ModelPagination = ({
  postsPerPage,
  currentPage,
  totalPosts,
  paginate,
}: {
  currentPage: number;
  postsPerPage: number;
  totalPosts: number;
  paginate: (number: number) => void;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm p-3">
        {pageNumbers.map((number, index) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              className={`${
                currentPage === index + 1 ? 'bg-quinary' : ''
              } flex items-center justify-center px-3 h-8 leading-tight text-tertiary bg-primary hover:text-primary hover:bg-tertiary hover:text-secondary`}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ModelPagination;
