const chapterContent = {
  wedding: {
    title: "婚礼",
    copy: "这一章还在整理中。"
  },
  home: {
    title: "家和家人",
    copy: "这一章还在整理中。"
  }
};

const dialog = document.querySelector("#chapter-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogCopy = document.querySelector("#dialog-copy");

document.querySelectorAll("[data-chapter]").forEach((card) => {
  card.addEventListener("click", () => {
    const chapter = chapterContent[card.dataset.chapter];

    if (!chapter || !dialog || !dialogTitle || !dialogCopy) return;

    dialogTitle.textContent = chapter.title;
    dialogCopy.textContent = chapter.copy;
    dialog.showModal();
  });
});

document.querySelector(".dialog-close")?.addEventListener("click", () => {
  dialog?.close();
});

document.querySelector(".dialog-return")?.addEventListener("click", () => {
  dialog?.close();
});

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});