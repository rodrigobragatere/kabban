(function () {
  const turmas = ["Turma A", "Turma B", "Turma C", "Módulo JS"];

  const atividadesCatalogo = [
    { titulo: "Entrevista com stakeholders", categoria: "Requisitos" },
    { titulo: "Documento de visão do produto", categoria: "Documentação" },
    { titulo: "Casos de uso / histórias", categoria: "Modelagem" },
    { titulo: "Protótipo de baixa fidelidade", categoria: "UX" },
    { titulo: "Revisão de requisitos com PO", categoria: "Validação" },
    { titulo: "Matriz de rastreabilidade", categoria: "Governança" },
    { titulo: "Workshop de priorização", categoria: "Negócio" },
    { titulo: "Checklist de qualidade INVEST", categoria: "Qualidade" },
  ];

  const demoAlunos = [
    { nome: "Ana Silva", turma: "Turma A", tag: "Frontend" },
    { nome: "Bruno Costa", turma: "Turma B", tag: "Backend" },
    { nome: "Carla Mendes", turma: "Turma A", tag: "Full stack" },
    { nome: "Diego Souza", turma: "Turma C", tag: "QA" },
    { nome: "Elena Rocha", turma: "Módulo JS", tag: "Frontend" },
  ];

  let dragged = null;
  let selectedCatalogItem = null;

  function randomTurma() {
    return turmas[Math.floor(Math.random() * turmas.length)];
  }

  function catalogItemAt(index) {
    return atividadesCatalogo[index % atividadesCatalogo.length];
  }

  function createCard(payload) {
    const nome = payload.nome;
    const turma = payload.turma;
    const tag = payload.tag;
    const atividade = payload.atividade;
    const categoriaAtividade = payload.categoriaAtividade;

    const card = document.createElement("article");
    card.className = "card";
    card.draggable = true;
    card.dataset.nome = nome;
    if (atividade) {
      card.dataset.atividade = atividade;
    }
    card.innerHTML =
      '<h3 class="card-name"></h3>' +
      '<p class="card-meta">' +
      '<span class="turma"></span>' +
      '<span class="tag"></span>' +
      "</p>";

    const nameEl = card.querySelector(".card-name");
    const metaTurma = card.querySelector(".turma");
    const metaTag = card.querySelector(".tag");

    if (atividade) {
      nameEl.textContent = nome;
      metaTurma.textContent = atividade;
      metaTag.textContent = categoriaAtividade || tag || "Atividade";
    } else {
      nameEl.textContent = nome;
      metaTurma.textContent = turma;
      metaTag.textContent = tag || "Aluno";
    }

    card.addEventListener("dragstart", function (e) {
      dragged = card;
      card.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", nome);
    });

    card.addEventListener("dragend", function () {
      card.classList.remove("dragging");
      dragged = null;
      document.querySelectorAll(".column-body.drag-over").forEach(function (el) {
        el.classList.remove("drag-over");
      });
    });

    return card;
  }

  function columnBody(status) {
    return document.querySelector('.column-body[data-drop="' + status + '"]');
  }

  function updateCounts() {
    ["todo", "doing", "done"].forEach(function (status) {
      const body = columnBody(status);
      const n = body.querySelectorAll(".card").length;
      const badge = document.querySelector('[data-column-count="' + status + '"]');
      if (badge) badge.textContent = String(n);
    });
  }

  function setupDropZones() {
    document.querySelectorAll(".column-body[data-drop]").forEach(function (zone) {
      zone.addEventListener("dragover", function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        zone.classList.add("drag-over");
      });

      zone.addEventListener("dragleave", function (e) {
        if (!zone.contains(e.relatedTarget)) zone.classList.remove("drag-over");
      });

      zone.addEventListener("drop", function (e) {
        e.preventDefault();
        zone.classList.remove("drag-over");
        if (dragged && zone !== dragged.parentElement) {
          zone.appendChild(dragged);
          updateCounts();
        }
      });
    });
  }

  function seedDemo() {
    const todo = columnBody("todo");
    const doing = columnBody("doing");
    const done = columnBody("done");

    demoAlunos.forEach(function (a, i) {
      const cat = catalogItemAt(i);
      const cardPayload = {
        nome: a.nome,
        turma: a.turma,
        tag: a.tag,
        atividade: cat.titulo,
        categoriaAtividade: cat.categoria,
      };
      const card = createCard(cardPayload);
      if (i < 2) todo.appendChild(card);
      else if (i < 4) doing.appendChild(card);
      else done.appendChild(card);
    });
    updateCounts();
  }

  function renderActivityCatalog() {
    const root = document.getElementById("activityCatalog");
    if (!root) return;

    atividadesCatalogo.forEach(function (item) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "activity-item";

      const title = document.createElement("span");
      title.className = "activity-item-title";
      title.textContent = item.titulo;

      const cat = document.createElement("span");
      cat.className = "activity-item-cat tag";
      cat.textContent = item.categoria;

      btn.appendChild(title);
      btn.appendChild(cat);

      btn.addEventListener("click", function () {
        root.querySelectorAll(".activity-item.is-selected").forEach(function (el) {
          el.classList.remove("is-selected");
        });
        btn.classList.add("is-selected");
        selectedCatalogItem = item;
        var panel = document.querySelector(".activity-panel");
        if (panel) panel.classList.remove("needs-attention");
      });

      li.appendChild(btn);
      root.appendChild(li);
    });
  }

  function flashActivityPanel() {
    var panel = document.querySelector(".activity-panel");
    if (!panel) return;
    panel.classList.add("needs-attention");
    window.setTimeout(function () {
      panel.classList.remove("needs-attention");
    }, 1200);
  }

  document.getElementById("btnAdicionar").addEventListener("click", function () {
    const input = document.getElementById("nomeAluno");
    const nome = (input.value || "").trim();
    if (!nome) {
      input.focus();
      return;
    }
    if (!selectedCatalogItem) {
      flashActivityPanel();
      var catalog = document.getElementById("activityCatalog");
      var firstBtn = catalog && catalog.querySelector(".activity-item");
      if (firstBtn) firstBtn.focus();
      return;
    }

    const todo = columnBody("todo");
    todo.appendChild(
      createCard({
        nome: nome,
        turma: randomTurma(),
        tag: "Novo",
        atividade: selectedCatalogItem.titulo,
        categoriaAtividade: selectedCatalogItem.categoria,
      })
    );
    input.value = "";
    updateCounts();
  });

  document.getElementById("nomeAluno").addEventListener("keydown", function (e) {
    if (e.key === "Enter") document.getElementById("btnAdicionar").click();
  });

  renderActivityCatalog();
  setupDropZones();
  seedDemo();
})();
