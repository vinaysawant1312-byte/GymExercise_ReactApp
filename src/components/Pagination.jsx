import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalExercises,
  itemsPerPage,
}) => {
  const total = totalExercises || 0;
  const perPage = itemsPerPage || 9;

  if (total <= perPage) return null;

  const totalPages = Math.ceil(total / perPage);
  const indexOfLast = Math.min(currentPage * perPage, total);
  const indexOfFirst = (currentPage - 1) * perPage + 1;

  const goTo = (page) => {
    const p = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(p);
    document
      .getElementById("exercises")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Generate page number buttons (max 5 visible)
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const btnBase =
    "inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200";
  const btnActive = "bg-orange-500 text-white shadow-md shadow-orange-200";
  const btnInactive =
    "text-gray-600 hover:bg-orange-50 hover:text-orange-500 border border-gray-200";
  const btnDisabled = "opacity-40 cursor-not-allowed";

  return (
    <div className="flex flex-col items-center gap-4 py-8 px-4">
      {/* Results count */}
      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-700">{indexOfFirst}</span> –{" "}
        <span className="font-semibold text-gray-700">{indexOfLast}</span> of{" "}
        <span className="font-semibold text-orange-500">{total}</span> exercises
      </p>

      {/* Pagination Controls */}
      <nav className="flex items-center gap-1" aria-label="Pagination">
        {/* Prev */}
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${btnBase} ${currentPage === 1 ? btnDisabled : btnInactive} gap-1 px-3 w-auto`}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* First page + ellipsis */}
        {getPageNumbers()[0] > 1 && (
          <>
            <button
              onClick={() => goTo(1)}
              className={`${btnBase} ${btnInactive}`}
            >
              1
            </button>
            {getPageNumbers()[0] > 2 && (
              <span className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
                …
              </span>
            )}
          </>
        )}

        {/* Page numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => goTo(page)}
            className={`${btnBase} ${page === currentPage ? btnActive : btnInactive}`}
          >
            {page}
          </button>
        ))}

        {/* Last page + ellipsis */}
        {getPageNumbers().at(-1) < totalPages && (
          <>
            {getPageNumbers().at(-1) < totalPages - 1 && (
              <span className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
                …
              </span>
            )}
            <button
              onClick={() => goTo(totalPages)}
              className={`${btnBase} ${btnInactive}`}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next */}
        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${btnBase} ${currentPage === totalPages ? btnDisabled : btnInactive} gap-1 px-3 w-auto`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </nav>

      {/* Page indicator on mobile */}
      <p className="text-xs text-gray-400 sm:hidden">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default Pagination;
