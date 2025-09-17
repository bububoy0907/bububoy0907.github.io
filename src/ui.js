export async function loadProfileCards() {
  const container = document.getElementById('info-cards');
  container.innerHTML = '';
  try {
    const res = await fetch('/data/profile.json', { cache: 'no-store' });
    const json = await res.json();
    for (const c of json.cards) {
      const el = document.createElement('div');
      el.className = 'card';
      el.innerHTML = `<h3>${c.title}</h3><p>${c.text}</p>`;
      container.appendChild(el);
    }
  } catch (e) {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<h3>Welcome</h3><p>Edit <code>/data/profile.json</code> to customize these cards.</p>`;
    container.appendChild(el);
  }
}
