console.log('Form script loaded');

const FEEDBACK_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

if (formEl) {
  const formData = { email: '', message: '' };

  // Восстановление состояния из localStorage
  const saved = localStorage.getItem(FEEDBACK_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.email) formData.email = parsed.email;
      if (parsed.message) formData.message = parsed.message;

      if (formEl.elements.email) formEl.elements.email.value = formData.email;
      if (formEl.elements.message) formEl.elements.message.value = formData.message;
    } catch (err) {
      console.warn('Failed to restore form state:', err);
    }
  }

  // Слушаем input
  formEl.addEventListener('input', (e) => {
    const { name, value } = e.target;
    if (name in formData) {
      formData[name] = value.trimStart();
      localStorage.setItem(FEEDBACK_KEY, JSON.stringify(formData));
    }
  });

  // Слушаем submit
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!email || !message) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Submitted form data:', { email, message });

    localStorage.removeItem(FEEDBACK_KEY);
    formEl.reset();
    formData.email = '';
    formData.message = '';
  });
}
