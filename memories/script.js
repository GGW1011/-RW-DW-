/*
  提问箱表单设置：
  1. 创建 Google Form。
  2. 点击“发送”旁边的菜单，选择“嵌入 HTML”。
  3. 复制嵌入代码里的网址，填到下面的 GOOGLE_FORM_EMBED_URL。
  4. 留空时，提问箱会显示尚未接入表单的提示。
*/
const GOOGLE_FORM_EMBED_URL = "";

/*
  想把已经回答的问题展示在首页弹窗里，就在这里添加。
  示例：
  { question: "你们最喜欢一起去哪里？", answer: "我们最喜欢……" }
*/
const publishedAnswers = [];

const chapterContent = {
  wedding: {
    title: "婚礼",
    copy: "这一章还在整理中。",
    note: "关于那一天、交换的承诺，以及只属于我们的婚礼回忆。"
  },

  home: {
    title: "家和家人",
    copy: "这一章还在整理中。",
    note: "关于我们的家、一起布置的日子，还有一直陪在身边的家人。"
  },

  travel: {
    title: "一起旅行",
    copy: "把一起去过的地方，和路上发生的小事慢慢收进来。",
    note: "这里会放我们的旅行照片、目的地和旅途里的故事。等你整理好第一段旅行回忆，再把它加进这个章节。"
  },

  ask: {
    title: "提问箱",
    copy: "有什么想问我们的？可以把问题留在这里。",
    note: "提交的问题会先由我们查看。我们会挑选想回答的问题，再把问答整理到这里。"
  }
};

const dialog = document.querySelector("#chapter-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogCopy = document.querySelector("#dialog-copy");
const dialogContent = document.querySelector("#dialog-content");

function addNote(text) {
  const note = document.createElement("p");
  note.className = "dialog-note";
  note.textContent = text;
  dialogContent.append(note);
}

function showPublishedAnswers() {
  const heading = document.createElement("h3");
  heading.className = "dialog-section-title";
  heading.textContent = "已经回答的问题";
  dialogContent.append(heading);

  if (publishedAnswers.length === 0) {
    const empty = document.createElement("p");
    empty.className = "dialog-note";
    empty.textContent = "回答会整理在这里。";
    dialogContent.append(empty);
    return;
  }

  publishedAnswers.forEach((item) => {
    const article = document.createElement("article");
    article.className = "question-answer";

    const question = document.createElement("p");
    question.className = "question-answer-question";
    question.textContent = `Q · ${item.question}`;

    const answer = document.createElement("p");
    answer.className = "question-answer-response";
    answer.textContent = `A · ${item.answer}`;

    article.append(question, answer);
    dialogContent.append(article);
  });
}

function openChapter(chapterName) {
  const chapter = chapterContent[chapterName];

  if (!chapter || !dialog || !dialogTitle || !dialogCopy || !dialogContent) {
    return;
  }

  dialogTitle.textContent = chapter.title;
  dialogCopy.textContent = chapter.copy;
  dialogContent.replaceChildren();

  if (chapterName === "ask") {
    addNote(chapter.note);

    if (GOOGLE_FORM_EMBED_URL.trim()) {
      const heading = document.createElement("h3");
      heading.className = "dialog-section-title";
      heading.textContent = "把问题留给我们";

      const frame = document.createElement("iframe");
      frame.className = "question-form-frame";
      frame.src = GOOGLE_FORM_EMBED_URL;
      frame.title = "Sherry 和 Dean 的提问箱";
      frame.loading = "lazy";
      frame.setAttribute("allowfullscreen", "");

      dialogContent.append(heading, frame);
    } else {
      addNote("提问表单还没有接入。创建 Google Form 后，把它的嵌入网址填到 assets/script.js 顶部的 GOOGLE_FORM_EMBED_URL，就可以开始收问题。");
    }

    showPublishedAnswers();
  } else {
    addNote(chapter.note);
  }

  dialog.showModal();
}

document.querySelectorAll("[data-chapter]").forEach((card) => {
  card.addEventListener("click", () => {
    openChapter(card.dataset.chapter);
  });
});

document.querySelectorAll("[data-open-chapter]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openChapter(link.dataset.openChapter);
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