const toastInitiator = (message) => {
  const toast = document.querySelector('#toast');
  toast.className = 'show';
  toast.innerHTML = `<span>${message}</span>`;
  setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 3000);
};

export default toastInitiator;
