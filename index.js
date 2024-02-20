let itemPerPage = 5;
let totalItems = 200;
let currentPage = 1;
let totalPages = Math.ceil(totalItems / itemPerPage);

(function renderItemPerPage() {
  const itemPerPageInput = document.getElementById("items-per-page");
  itemPerPageInput.addEventListener("change", (e) => {
    itemPerPage = e.target.value;
    totalPages = Math.ceil(totalItems / itemPerPage);
    renderUpdate();
  });
})();

(function renderTotalItems() {
  const totalItemsInput = document.getElementById("item-total");
  totalItemsInput.addEventListener("change", (e) => {
    totalItems = e.target.value;
    totalPages = Math.ceil(totalItems / itemPerPage);
    renderUpdate();
  });
})();

(function renderNavigationButton() {
  const prevButton = document.getElementById("prev-page-button");
  const nextButton = document.getElementById("next-page-button");
  const firstPageButton = document.getElementById("first-page-button");
  const lastPageButton = document.getElementById("last-page-button");
  prevButton.addEventListener("click", () => {
    currentPage = currentPage > 1 ? currentPage - 1 : 1;
    renderUpdate();
  });
  nextButton.addEventListener("click", () => {
    currentPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    renderUpdate();
  });
  firstPageButton.addEventListener("click", () => {
    currentPage = 1;
    renderUpdate();
  });
  lastPageButton.addEventListener("click", () => {
    currentPage = totalPages;
    renderUpdate();
  });
})();
function renderItemRange() {
  let start = (currentPage - 1) * itemPerPage + 1;
  let end = Math.min(currentPage * itemPerPage, totalItems);

  const itemsCount = document.getElementById("items-range");
  itemsCount.innerHTML = `${start} - ${end} of`;
}
function createButton(page, container, isDisabled = false) {
  let button = document.createElement("button");
  button.textContent = page;
  button.className = `pagination-button ${
    currentPage === page ? "active" : ""
  }`;
  button.disabled = isDisabled;

  if (!isDisabled) {
    button.addEventListener("click", () => {
      currentPage = page;
      renderUpdate();
    });
  }
  container.appendChild(button);
  return button;
}

function createPaginationFull() {
  const paginationFull = document.getElementById("pagination-full");
  paginationFull.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    createButton(i, paginationFull);
  }
}

function createPaginationShort() {
  const paginationShort = document.getElementById("pagination-short");
  paginationShort.innerHTML = "";
  let button = createButton(1, paginationShort);
  button.className = "pagination-button active";

  if (totalPages <= 7) {
    for (let i = 2; i < totalPages; i++) {
      createButton(i, paginationShort);
    }
  } else {
    if (currentPage - 1 >= 3) {
      createButton("...", paginationShort, true);
    }

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(currentPage + 1, totalPages - 1);

    if (currentPage - 1 < 3) {
      end = Math.min(5, totalPages - 1);
    }
    if (totalPages - currentPage < 3) {
      start = Math.max(3, totalPages - 4);
    }

    for (let i = start; i <= end; i++) {
      createButton(i, paginationShort);
    }

    if (totalPages - currentPage >= 3) {
      createButton("...", paginationShort, true);
    }
  }

  if (totalPages > 1) {
    createButton(totalPages, paginationShort);
  }
}

function renderUpdate() {
  renderItemRange();
  createPaginationShort();
  createPaginationFull();
}

// Init render
renderUpdate();
