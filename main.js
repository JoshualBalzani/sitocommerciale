document.documentElement.classList.add("js");
(() => {
  document.querySelectorAll(".faq-list details").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open)
        document.querySelectorAll(".faq-list details").forEach((other) => {
          if (other !== item) other.open = false;
        });
    });
  });
})();
/* Catalogue, request context and real form delivery. */
(() => {
  const form = document.querySelector("#contact-form");
  const cards = [...document.querySelectorAll(".catalog-card")];
  const search = document.querySelector("#catalog-search");
  const filters = [...document.querySelectorAll("[data-filter]")];
  let activeFilter = "all";
  const normalize = (value) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  function filterCatalog() {
    const query = normalize(search?.value.trim() || "");
    let count = 0;
    cards.forEach((card) => {
      const visible =
        (activeFilter === "all" || card.dataset.category === activeFilter) &&
        normalize(card.dataset.search).includes(query);
      card.hidden = !visible;
      if (visible) count++;
    });
    const counter = document.querySelector("#catalog-count");
    if (counter)
      counter.textContent = `${count} ${count === 1 ? "soluzione trovata" : "soluzioni trovate"}`;
    const empty = document.querySelector(".catalog-empty");
    if (empty) empty.hidden = count !== 0;
  }
  if (cards.length)
    document.querySelector("[data-catalog-tools]").hidden = false;
  search?.addEventListener("input", filterCatalog);
  if (cards.length) window.addEventListener("pageshow", () => requestAnimationFrame(filterCatalog));
  filters.forEach((button) =>
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filters.forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
      filterCatalog();
    }),
  );
  document
    .querySelector("[data-reset-catalog]")
    ?.addEventListener("click", () => {
      activeFilter = "all";
      search.value = "";
      filters.forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.filter === "all"),
        ),
      );
      filterCatalog();
      search.focus();
    });
  document
    .querySelectorAll(
      "[data-request-category], [data-request-brand], [data-request-product], [data-request-client], [data-request-type]",
    )
    .forEach((link) => {
      link.addEventListener("click", () => {
        if (!form) return;
        const values = {
          "request-category": link.dataset.requestCategory,
          "request-brand": link.dataset.requestBrand,
          "request-product": link.dataset.requestProduct,
          "request-client": link.dataset.requestClient,
          "request-type": link.dataset.requestType,
        };
        if (link.dataset.requestBrand)
          document.querySelector("#request-product").value = "";
        if (link.dataset.requestProduct)
          document.querySelector("#request-brand").value = "";
        Object.entries(values).forEach(([id, value]) => {
          if (value !== undefined) document.getElementById(id).value = value;
        });
        requestAnimationFrame(() =>
          document
            .querySelector("#request-title")
            .focus({ preventScroll: true }),
        );
      });
    });
  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {}
    }
    const field = document.createElement("textarea");
    field.value = text;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {}
    field.remove();
    return copied;
  }
  document
    .querySelector("[data-copy-email]")
    ?.addEventListener("click", async () => {
      const copied = await copyText("info@commercialeclimaplus.it");
      document.querySelector(".copy-status").textContent = copied
        ? "Indirizzo copiato."
        : "Indirizzo: info@commercialeclimaplus.it";
    });
  if (!form) return;
  const status = document.querySelector("#form-status");
  const submit = form.querySelector("[type=submit]");
  const fallback = form.querySelector(".form-fallback");
  const message = form.querySelector("[name=messaggio]");
  let sending = false;
  function countMessage() {
    form.querySelector("[data-message-count]").textContent =
      `${message.value.length} / 3000`;
  }
  message.addEventListener("input", () => {
    message.setCustomValidity("");
    countMessage();
  });
  function getRequestText() {
    const data = new FormData(form);
    return [
      "Richiesta da Commerciale Clima Plus",
      ...[
        ["Tipo", "tipo-richiesta"],
        ["Profilo", "profilo"],
        ["Categoria", "categoria"],
        ["Marchio", "marchio"],
        ["Prodotto", "prodotto"],
        ["Nome", "nome"],
        ["Azienda", "azienda"],
        ["Email", "email"],
        ["Telefono", "telefono"],
        ["Messaggio", "messaggio"],
      ].map(([label, key]) => `${label}: ${data.get(key) || "-"}`),
    ].join("\n");
  }
  function showStatus(text, state) {
    status.textContent = text;
    status.dataset.state = state;
    const confirmation = document.querySelector("#request-success");
    if (confirmation) confirmation.hidden = state !== "success";
    status.hidden = false;
    status.focus({ preventScroll: true });
    if (state === "success") status.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  function showFallback() {
    fallback.hidden = false;
    form.querySelector("[data-email-fallback]").href =
      `mailto:info@commercialeclimaplus.it?subject=${encodeURIComponent("Richiesta dal sito")}&body=${encodeURIComponent(getRequestText())}`;
  }
  form
    .querySelector("[data-copy-request]")
    .addEventListener("click", async () => {
      const copied = await copyText(getRequestText());
      form.querySelector("[data-copy-status]").textContent = copied
        ? "Richiesta copiata. Puoi incollarla in una email."
        : "Copia non disponibile: seleziona i dati del modulo o scrivici direttamente.";
    });
  form.addEventListener("input", () => {
    const confirmation = document.querySelector("#request-success");
    if (confirmation) confirmation.hidden = true;
    if (status.dataset.state === "success") status.hidden = true;
    if (!fallback.hidden) showFallback();
    form.querySelector("[data-copy-status]").textContent = "";
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;
    message.setCustomValidity(
      message.value.trim().length < 15
        ? "Descrivi la richiesta usando almeno 15 caratteri."
        : "",
    );
    if (!form.reportValidity()) return;
    const accessKey = form.querySelector('[name="access_key"]')?.value.trim();
    if (
      location.protocol === "file:" ||
      !accessKey ||
      !/^[a-f0-9-]{36}$/i.test(accessKey)
    ) {
      showStatus(
        "Richiesta non inviata. Aprire la versione pubblicata del sito oppure utilizzare i contatti diretti disponibili qui sotto.",
        "warning",
      );
      showFallback();
      return;
    }
    if (form.querySelector('[name="botcheck"]')?.checked) return;
    sending = true;
    submit.disabled = true;
    form.setAttribute("aria-busy", "true");
    submit.textContent = "Invio in corso…";
    fallback.hidden = true;
    showStatus("Invio della richiesta in corso…", "pending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "omit",
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        const failure = new Error("Form delivery not confirmed");
        failure.status = response.status;
        throw failure;
      }

      form.reset();
      countMessage();
      showStatus(
        "Richiesta inviata. La risposta sarà trasmessa ai recapiti indicati.",
        "success",
      );
    } catch (error) {
      showStatus(
        error.name === "AbortError"
          ? "Il servizio non ha confermato l’invio in tempo. Non possiamo verificarne la ricezione: prima di riprovare puoi contattarci direttamente."
          : error.status === 429
            ? "Il servizio ha raggiunto un limite di invio temporaneo. I dati sono rimasti nel modulo: utilizzare i contatti diretti oppure riprovare più tardi."
            : "Invio non riuscito. I dati sono rimasti nel modulo: riprovare oppure utilizzare i contatti diretti.",
        "error",
      );
      showFallback();
    } finally {
      clearTimeout(timeout);
      sending = false;
      submit.disabled = false;
      form.removeAttribute("aria-busy");
      submit.innerHTML = "Invia richiesta ";
    }
  });
})();

/* Product-area links prefill only non-personal product fields. */
(() => {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const params = new URLSearchParams(location.search);
  const category = params.get("categoria");
  const product = params.get("prodotto");
  const field = form.querySelector('[name="categoria"]');
  if (
    category &&
    [...field.options].some((option) => option.value === category)
  ) {
    field.value = category;
    if (product)
      form.querySelector('[name="prodotto"]').value = product.slice(0, 180);
  }
})();
