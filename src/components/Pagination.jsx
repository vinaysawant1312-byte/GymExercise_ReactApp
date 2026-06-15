import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalExercises,
  itemsPerPage,
}) => {
  const total = totalExercises || 0;
  const perPage = itemsPerPage || 9;

  if (total <= perPage) return null; // no pagination needed

  const totalPages = Math.ceil(total / perPage);
  const indexOfLast = Math.min(currentPage * perPage, total);
  const indexOfFirst = (currentPage - 1) * perPage + 1;

  const goTo = (page) => {
    const p = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(p);
  };

  return (
    <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 disabled:opacity-40"
        >
          Previous
        </button>
        <div className="flex items-center">
          <span className="mx-2 inline-flex items-center px-3 py-2 bg-white/5 rounded-md text-sm font-semibold text-gray-200">
            {currentPage}
          </span>
        </div>
        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-300">
            Showing <span className="font-medium">{indexOfFirst}</span> to{" "}
            <span className="font-medium">{indexOfLast}</span> of{" "}
            <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex items-center space-x-3"
          >
            <button
              onClick={() => goTo(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-3 py-2 text-gray-400 hover:bg-white/5 rounded-md disabled:opacity-40"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>

            <span className="inline-flex items-center px-4 py-2 bg-white/5 rounded-md text-sm font-semibold text-gray-200">
              {currentPage}
            </span>

            <button
              onClick={() => goTo(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-3 py-2 text-gray-400 hover:bg-white/5 rounded-md disabled:opacity-40"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
