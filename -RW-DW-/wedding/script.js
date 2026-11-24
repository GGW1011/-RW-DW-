const photoFolder = "../assets/images/wedding/";

const photos = Array.from({ length: 15 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return `${photoFolder}${number}.jpg`;
});

const photo = document.querySelector("#album-photo");
const counter = document.querySelector("#album-counter");
const previousButton = document.querySelector("#previous-photo");
const nextButton = document.querySelector("#next-photo");

let currentIndex = 0;
let changingPhoto = false;

function updateCounter() {
  counter.textContent =
    `${String(currentIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
}

function showPhoto(nextIndex) {
  if (changingPhoto || photos.length === 0) return;

  const targetIndex = (nextIndex + photos.length) % photos.length;
  const preloadedPhoto = new Image();

  changingPhoto = true;
  photo.classList.add("is-turning");

  preloadedPhoto.onload = () => {
    window.setTimeout(() => {
      currentIndex = targetIndex;
      photo.src = preloadedPhoto.src;
      photo.alt = `试纱照片 ${currentIndex + 1}`;
      updateCounter();

      photo.classList.remove("is-turning");
      changingPhoto = false;
    }, 180);
  };

  preloadedPhoto.onerror = () => {
    photo.classList.remove("is-turning");
    changingPhoto = false;
    console.error(`照片路径无效：${photos[targetIndex]}`);
  };

  preloadedPhoto.src = photos[targetIndex];
}

previousButton.addEventListener("click", () => {
  showPhoto(currentIndex - 1);
});

nextButton.addEventListener("click", () => {
  showPhoto(currentIndex + 1);
});

/* 键盘左右键翻页 */
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showPhoto(currentIndex - 1);
  if (event.key === "ArrowRight") showPhoto(currentIndex + 1);
});

/* 手机左右滑动翻页 */
let touchStartX = 0;

photo.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

photo.addEventListener("touchend", (event) => {
  const touchEndX = event.changedTouches[0].screenX;
  const distance = touchEndX - touchStartX;

  if (Math.abs(distance) < 40) return;

  if (distance > 0) {
    showPhoto(currentIndex - 1);
  } else {
    showPhoto(currentIndex + 1);
  }
}, { passive: true });

updateCounter();