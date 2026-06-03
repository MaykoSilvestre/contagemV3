// ======================
// ELEMENTOS
// ======================

const setupScreen =
  document.getElementById(
    "setupScreen"
  );

const mainScreen =
  document.getElementById(
    "mainScreen"
  );

const sectorNameInput =
  document.getElementById(
    "sectorNameInput"
  );

const saveSectorBtn =
  document.getElementById(
    "saveSectorBtn"
  );

const sectorName =
  document.getElementById(
    "sectorName"
  );

const totalCount =
  document.getElementById(
    "totalCount"
  );

const categoriesContainer =
  document.getElementById(
    "categoriesContainer"
  );

const settingsBtn =
  document.getElementById(
    "settingsBtn"
  );

const settingsModal =
  document.getElementById(
    "settingsModal"
  );

const closeSettingsBtn =
  document.getElementById(
    "closeSettingsBtn"
  );

const editSectorInput =
  document.getElementById(
    "editSectorInput"
  );

const categoryList =
  document.getElementById(
    "categoryList"
  );

const newCategoryBtn =
  document.getElementById(
    "newCategoryBtn"
  );

const categoryModal =
  document.getElementById(
    "categoryModal"
  );

const categoryModalTitle =
  document.getElementById(
    "categoryModalTitle"
  );

const categoryNameInput =
  document.getElementById(
    "categoryNameInput"
  );

const categoryLimitInput =
  document.getElementById(
    "categoryLimitInput"
  );

const saveCategoryBtn =
  document.getElementById(
    "saveCategoryBtn"
  );

const previewBtn =
  document.getElementById(
    "previewBtn"
  );

const previewModal =
  document.getElementById(
    "previewModal"
  );

const previewText =
  document.getElementById(
    "previewText"
  );

const closePreviewBtn =
  document.getElementById(
    "closePreviewBtn"
  );

const shareBtn =
  document.getElementById(
    "shareBtn"
  );

const resetBtn =
  document.getElementById(
    "resetBtn"
  );

// ======================
// DADOS
// ======================

let appData = {

  sectorName: "",

  categories: []

};

let editingCategoryId =
  null;

// ======================
// STORAGE
// ======================

function saveData() {

  localStorage.setItem(
    "contagemEquipeV3",
    JSON.stringify(appData)
  );

}

function loadData() {

  const saved =
    localStorage.getItem(
      "contagemEquipeV3"
    );

  if (saved) {

    appData =
      JSON.parse(saved);

  }

}

// ======================
// UTILIDADES
// ======================

function generateId() {

  return Date.now().toString() +
    Math.random()
      .toString(36)
      .substring(2, 8);

}

function openModal(modal) {

  modal.classList.remove(
    "hidden"
  );

}

function closeModal(modal) {

  modal.classList.add(
    "hidden"
  );

}

// ======================
// PRIMEIRA EXECUÇÃO
// ======================

function updateScreen() {

  if (!appData.sectorName) {

    setupScreen.classList.remove(
      "hidden"
    );

    mainScreen.classList.add(
      "hidden"
    );

    return;

  }

  setupScreen.classList.add(
    "hidden"
  );

  mainScreen.classList.remove(
    "hidden"
  );

  sectorName.textContent =
    appData.sectorName;

  editSectorInput.value =
    appData.sectorName;

  renderCategories();

}

saveSectorBtn.addEventListener(
  "click",
  () => {

    const name =
      sectorNameInput.value.trim();

    if (!name) return;

    appData.sectorName =
      name;

    saveData();

    updateScreen();

  }
);

// ======================
// TOTAL
// ======================

function updateTotal() {

  let total = 0;

  appData.categories.forEach(
    category => {

      total += category.count;

    }
  );

  totalCount.textContent =
    total;

}

// ======================
// RENDER CATEGORIAS
// ======================

function renderCategories() {

  categoriesContainer.innerHTML =
    "";

  appData.categories.forEach(
    category => {

      const row =
        document.createElement(
          "div"
        );

      row.className =
        "category-row";

      const isComplete =
        category.limit &&
        category.count >=
          category.limit;

      row.innerHTML = `

        <div class="category-name">

          ${category.name}

        </div>

        <div class="counter-area">

          <button
            class="counter-btn minus-btn"
            data-id="${category.id}">

            -

          </button>

          <div
            class="counter-display
            ${
              isComplete
                ? "complete"
                : ""
            }">

            ${category.count}/${category.limit}
            ${
              isComplete
                ? " ✓"
                : ""
            }

          </div>

          <button
            class="counter-btn plus-btn"
            data-id="${category.id}">

            +

          </button>

        </div>

      `;

      categoriesContainer.appendChild(
        row
      );

    }
  );

  bindCounterButtons();

  updateTotal();

}

// ======================
// CONTADORES
// ======================

function bindCounterButtons() {

  document
    .querySelectorAll(
      ".plus-btn"
    )
    .forEach(btn => {

      btn.addEventListener(
        "click",
        () => {

          const category =
            appData.categories.find(
              c =>
                c.id ===
                btn.dataset.id
            );

          if (!category)
            return;

          if (
            category.limit &&
            category.count >=
              category.limit
          ) {

            renderCategories();

            return;

          }

          category.count++;

          saveData();

          renderCategories();

        }
      );

    });

  document
    .querySelectorAll(
      ".minus-btn"
    )
    .forEach(btn => {

      btn.addEventListener(
        "click",
        () => {

          const category =
            appData.categories.find(
              c =>
                c.id ===
                btn.dataset.id
            );

          if (!category)
            return;

          if (
            category.count > 0
          ) {

            category.count--;

          }

          saveData();

          renderCategories();

        }
      );

    });

}

// ======================
// CONFIGURAÇÕES
// ======================

settingsBtn.addEventListener(
  "click",
  () => {

    editSectorInput.value =
      appData.sectorName;

    renderCategoryList();

    openModal(
      settingsModal
    );

  }
);

closeSettingsBtn.addEventListener(
  "click",
  () => {

    closeModal(
      settingsModal
    );

  }
);

// ======================
// EDITAR NOME DO SETOR
// ======================

editSectorInput.addEventListener(
  "input",
  () => {

    appData.sectorName =
      editSectorInput.value.trim();

    saveData();

    sectorName.textContent =
      appData.sectorName;

  }
);

// ======================
// LISTA DE CATEGORIAS
// ======================

function renderCategoryList() {

  categoryList.innerHTML =
    "";

  appData.categories.forEach(
    category => {

      const item =
        document.createElement(
          "div"
        );

      item.className =
        "category-item";

      item.innerHTML = `

        <span>

          ${category.name}
          (${category.limit})

        </span>

        <div class="category-actions">

          <button
            class="edit-category-btn"
            data-id="${category.id}">

            ✏️

          </button>

          <button
            class="delete-category-btn"
            data-id="${category.id}">

            🗑️

          </button>

        </div>

      `;

      categoryList.appendChild(
        item
      );

    }
  );

  bindCategoryButtons();

}

// ======================
// NOVA CATEGORIA
// ======================

newCategoryBtn.addEventListener(
  "click",
  () => {

    editingCategoryId =
      null;

    categoryModalTitle.textContent =
      "Nova Categoria";

    categoryNameInput.value =
      "";

    categoryLimitInput.value =
      "";

    openModal(
      categoryModal
    );

  }
);

// ======================
// BOTÕES EDITAR/EXCLUIR
// ======================

function bindCategoryButtons() {

  document
    .querySelectorAll(
      ".edit-category-btn"
    )
    .forEach(btn => {

      btn.addEventListener(
        "click",
        () => {

          const category =
            appData.categories.find(
              c =>
                c.id ===
                btn.dataset.id
            );

          if (!category)
            return;

          editingCategoryId =
            category.id;

          categoryModalTitle.textContent =
            "Editar Categoria";

          categoryNameInput.value =
            category.name;

          categoryLimitInput.value =
            category.limit;

          openModal(
            categoryModal
          );

        }
      );

    });

  document
    .querySelectorAll(
      ".delete-category-btn"
    )
    .forEach(btn => {

      btn.addEventListener(
        "click",
        () => {

          const confirmed =
            confirm(
              "Excluir esta categoria?"
            );

          if (!confirmed)
            return;

          appData.categories =
            appData.categories.filter(
              c =>
                c.id !==
                btn.dataset.id
            );

          saveData();

          renderCategoryList();

          renderCategories();

        }
      );

    });

}

// ======================
// SALVAR CATEGORIA
// ======================

saveCategoryBtn.addEventListener(
  "click",
  () => {

    const name =
      categoryNameInput.value.trim();

    if (!name)
      return;

    let limit =
      parseInt(
        categoryLimitInput.value
      );

    if (
      Number.isNaN(limit)
    ) {

      limit = 0;

    }

    // ======================
    // EDITAR
    // ======================

    if (
      editingCategoryId
    ) {

      const category =
        appData.categories.find(
          c =>
            c.id ===
            editingCategoryId
        );

      if (!category)
        return;

      category.name =
        name;

      category.limit =
        limit;

      if (
        category.count >
        limit
      ) {

        category.count =
          limit;

      }

    }

    // ======================
    // NOVA
    // ======================

    else {

      appData.categories.push({

        id: generateId(),

        name,

        limit,

        count: 0

      });

    }

    saveData();

    renderCategoryList();

    renderCategories();

    closeModal(
      categoryModal
    );

  }
);

// ======================
// GERAR MENSAGEM
// ======================

function generateMessage() {

  const today =
    new Date();

  const date =
    today.toLocaleDateString(
      "pt-BR"
    );

  let total = 0;

  let message =

`${date}

📋 Contagem da ${appData.sectorName}

`;

  appData.categories.forEach(
    category => {

      total +=
        category.count;

      message +=
`${category.name} - ${category.count}/${category.limit}
`;

    }
  );

  message +=

`
👥 Total: ${total}`;

  return message;

}

// ======================
// PRÉVIA
// ======================

previewBtn.addEventListener(
  "click",
  () => {

    previewText.textContent =
      generateMessage();

    openModal(
      previewModal
    );

  }
);

closePreviewBtn.addEventListener(
  "click",
  () => {

    closeModal(
      previewModal
    );

  }
);

// ======================
// COMPARTILHAR
// ======================

shareBtn.addEventListener(
  "click",
  async () => {

    const text =
      generateMessage();

    try {

      if (
        navigator.share
      ) {

        await navigator.share({

          text

        });

      }

      else {

        alert(
          "Seu navegador não suporta compartilhamento."
        );

      }

    }

    catch {

      // usuário cancelou
    }

  }
);

// ======================
// RESETAR
// ======================

resetBtn.addEventListener(
  "click",
  () => {

    const confirmed =
      confirm(
        "Resetar todas as contagens?"
      );

    if (!confirmed)
      return;

    appData.categories.forEach(
      category => {

        category.count = 0;

      }
    );

    saveData();

    renderCategories();

  }
);

// ======================
// FECHAR MODAIS
// ======================

window.addEventListener(
  "click",
  e => {

    if (
      e.target ===
      settingsModal
    ) {

      closeModal(
        settingsModal
      );

    }

    if (
      e.target ===
      categoryModal
    ) {

      closeModal(
        categoryModal
      );

    }

    if (
      e.target ===
      previewModal
    ) {

      closeModal(
        previewModal
      );

    }

  }
);

// ======================
// REGISTRAR SERVICE WORKER
// ======================

if (
  "serviceWorker" in navigator
) {

  window.addEventListener(
    "load",
    () => {

      navigator
        .serviceWorker
        .register(
          "./service-worker.js"
        )
        .catch(
          error => {

            console.error(
              error
            );

          }
        );

    }
  );

}

// ======================
// INICIALIZAÇÃO
// ======================

function initializeApp() {

  loadData();

  updateScreen();

}

initializeApp();
