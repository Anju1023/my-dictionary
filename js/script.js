/* global hljs */
/* eslint-disable no-unused-vars */
hljs.highlightAll();

function copyCode(btn) {
  const code = btn.nextElementSibling.querySelector('code').innerText;
  navigator.clipboard.writeText(code).then(() => {
    const icon = btn.querySelector('i');
    const originalClass = icon.className;

    icon.className = 'fa-solid fa-check'; // ✅に変える
    setTimeout(() => {
      icon.className = originalClass; // 元に戻す
    }, 1500);
  });
}

document.querySelector('a[href="#page-top"]').addEventListener('click', e => {
  e.preventDefault();

  const target = document.querySelector('#page-top');
  target.scrollIntoView({
    behavior: 'smooth',
  });
});
