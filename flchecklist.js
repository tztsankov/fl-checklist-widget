// Premium Fitness Lifestyle Checklist - Full Featured Version
(function() {
  // Create rich styles with animations and premium design
  const style = document.createElement('style');
  style.textContent = `
    /* Base reset and fonts */
    .fl-premium * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    }

    /* Core container positioning */
    .fl-premium {
      position: fixed;
      bottom: 85px;
      right: 20px;
      z-index: 99999;
      font-size: 16px;
      color: #fff;
      filter: drop-shadow(0 0 10px rgba(0,0,0,0.2));
    }

    /* Dark overlay when expanded */
    .fl-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(3px);
      z-index: 99998;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    
    .fl-overlay.fl-active {
      opacity: 1;
      pointer-events: all;
    }

    /* Minimized button styling */
    .fl-minimized {
      background: linear-gradient(135deg, #131313 0%, #000000 100%);
      border: 2px solid #D7FB00;
      border-radius: 24px;
      box-shadow: 0 0 20px rgba(215, 251, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.25);
      padding: 12px 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 280px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      transform: translateY(0);
    }

    .fl-minimized:hover {
      box-shadow: 0 0 25px rgba(215, 251, 0, 0.6), 0 10px 25px rgba(0, 0, 0, 0.3);
      transform: translateY(-2px);
    }
    
    .fl-minimized:active {
      transform: translateY(0);
      box-shadow: 0 0 15px rgba(215, 251, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .fl-title {
      font-weight: 700;
      color: #D7FB00;
      margin-right: 12px;
      letter-spacing: 0.3px;
    }

    .fl-badge {
      background: linear-gradient(135deg, #D7FB00 0%, #AACC00 100%);
      color: #000;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 50px;
      font-size: 14px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    /* Expanded panel styling */
    .fl-expanded {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      width: 90%;
      max-width: 520px;
      max-height: 85vh;
      background: linear-gradient(145deg, #131313 0%, #070707 100%);
      border-radius: 24px;
      border: 2px solid #D7FB00;
      box-shadow: 0 0 30px rgba(215, 251, 0, 0.4), 0 10px 40px rgba(0, 0, 0, 0.4);
      overflow-y: auto;
      z-index: 100000;
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .fl-expanded.fl-active {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    .fl-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: linear-gradient(to bottom, rgba(30, 30, 30, 0.8) 0%, rgba(15, 15, 15, 0) 100%);
      backdrop-filter: blur(10px);
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .fl-logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .fl-logo-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #D7FB00 0%, #AACC00 100%);
      color: #000;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 18px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    .fl-widget-title {
      font-size: 24px;
      font-weight: 900;
      letter-spacing: -0.5px;
    }

    .fl-title-highlight {
      background: linear-gradient(135deg, #D7FB00 0%, #FFF44F 180%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .fl-percentage {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .fl-percentage-circle {
      background: linear-gradient(135deg, #D7FB00 0%, #AACC00 100%);
      color: #000;
      font-size: 18px;
      font-weight: 700;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px rgba(215, 251, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2);
      margin-bottom: 4px;
      position: relative;
      overflow: hidden;
    }
    
    .fl-progress-bg {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.15);
      transition: height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .fl-percentage-label {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .fl-close-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .fl-close-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.9);
    }

    .fl-content {
      padding: 20px;
    }

    .fl-checklist-container {
      background: rgba(20, 20, 20, 0.6);
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 20px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .fl-checklist-header {
      display: flex;
      justify-content: space-between;
      padding: 16px 20px;
      background: rgba(30, 30, 30, 0.6);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .fl-section-title {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
      letter-spacing: 1.2px;
      font-weight: 600;
    }

    .fl-checklist-items {
      display: flex;
      flex-direction: column;
    }

    .fl-checklist-item {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      transition: background-color 0.2s;
    }

    .fl-checklist-item:last-child {
      border-bottom: none;
    }

    .fl-checklist-item:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }

    .fl-item-checkbox {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.3);
      margin-right: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      position: relative;
      background: transparent;
    }

    .fl-item-checkbox:hover {
      border-color: rgba(215, 251, 0, 0.7);
    }

    .fl-item-checkbox.fl-checked {
      background: #D7FB00;
      border-color: #D7FB00;
    }

    .fl-item-check {
      opacity: 0;
      color: #000;
      transform: scale(0);
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .fl-checked .fl-item-check {
      opacity: 1;
      transform: scale(1);
    }

    .fl-item-emoji {
      font-size: 18px;
      margin-right: 12px;
      filter: grayscale(0.2);
    }

    .fl-item-text {
      flex-grow: 1;
      font-size: 16px;
      transition: all 0.2s ease;
    }

    .fl-checked .fl-item-text {
      text-decoration: line-through;
      opacity: 0.5;
    }

    .fl-remove-btn {
      opacity: 0;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-left: 8px;
    }

    .fl-checklist-item:hover .fl-remove-btn {
      opacity: 1;
    }

    .fl-remove-btn:hover {
      background: rgba(255, 59, 59, 0.2);
      color: rgba(255, 59, 59, 0.9);
    }

    .fl-add-item-container {
      margin-bottom: 20px;
    }

    .fl-add-item-btn {
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.2s ease;
      font-weight: 500;
    }

    .fl-add-item-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.9);
      border-color: rgba(255, 255, 255, 0.15);
    }

    .fl-plus-icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: linear-gradient(135deg, #D7FB00 0%, #AACC00 100%);
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
      margin-right: 4px;
    }

    .fl-new-item-form {
      background: rgba(30, 30, 30, 0.6);
      border-radius: 16px;
      padding: 20px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .fl-emoji-selector {
      display: flex;
      overflow-x: auto;
      gap: 8px;
      padding-bottom: 16px;
      margin-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
    }

    .fl-emoji-selector::-webkit-scrollbar {
      height: 6px;
    }

    .fl-emoji-selector::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 6px;
    }

    .fl-emoji-selector::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 6px;
    }

    .fl-emoji-option {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      cursor: pointer;
      font-size: 20px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.2s ease;
    }

    .fl-emoji-option:hover {
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-2px);
    }

    .fl-emoji-selected {
      background: rgba(215, 251, 0, 0.2);
      border-color: rgba(215, 251, 0, 0.4);
      box-shadow: 0 0 10px rgba(215, 251, 0, 0.2);
    }

    .fl-input-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .fl-selected-emoji {
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .fl-new-item-input {
      flex-grow: 1;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 14px 16px;
      color: white;
      font-size: 16px;
      transition: all 0.2s ease;
    }

    .fl-new-item-input:focus {
      outline: none;
      border-color: rgba(215, 251, 0, 0.5);
      box-shadow: 0 0 0 2px rgba(215, 251, 0, 0.2);
    }

    .fl-add-btn {
      background: linear-gradient(135deg, #D7FB00 0%, #AACC00 100%);
      color: #000;
      font-weight: 600;
      padding: 12px 20px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
      white-space: nowrap;
    }

    .fl-add-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .fl-add-btn:active {
      transform: translateY(0);
    }

    .fl-add-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: translateY(0);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }

    .fl-footer {
      text-align: center;
      padding: 16px;
      color: rgba(255, 255, 255, 0.4);
      font-size: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      margin-top: 20px;
    }

    .fl-heartbeat {
      display: inline-block;
      margin: 0 3px;
      color: #ff4757;
      animation: heartbeat 1.5s ease infinite;
    }

    @keyframes heartbeat {
      0% { transform: scale(1); }
      15% { transform: scale(1.3); }
      30% { transform: scale(1); }
      45% { transform: scale(1.3); }
      60% { transform: scale(1); }
      100% { transform: scale(1); }
    }

    .fl-progress-bar {
      background: rgba(30, 30, 30, 0.6);
      border-radius: 8px;
      height: 8px;
      margin-bottom: 20px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .fl-progress-fill {
      height: 100%;
      background: linear-gradient(to right, #D7FB00, #AACC00);
      border-radius: 8px;
      transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @media (max-width: 600px) {
      .fl-expanded {
        width: 95%;
        max-height: 80vh;
      }
      
      .fl-header {
        padding: 16px 20px;
      }
      
      .fl-content {
        padding: 16px;
      }
      
      .fl-percentage-circle {
        width: 46px;
        height: 46px;
      }
    }
    
    /* Animations and transitions */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .fl-checklist-item {
      animation: slideUp 0.3s ease forwards;
      animation-delay: calc(var(--item-index) * 0.05s);
      opacity: 0;
    }

    /* Premium style enhancements */
    .fl-minimized::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(135deg, rgba(215, 251, 0, 0.5) 0%, rgba(215, 251, 0, 0) 60%);
      border-radius: 24px;
      z-index: -1;
      opacity: 0.5;
    }
    
    .fl-expanded::before {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      background: linear-gradient(135deg, rgba(215, 251, 0, 0.3) 0%, rgba(215, 251, 0, 0) 60%);
      border-radius: 24px;
      z-index: -1;
      opacity: 0.5;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  // SVG Icons
  const icons = {
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    close: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    plus: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
    trash: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
    heart: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>'
  };

  // Default checklist items
  const defaultItems = [
    { id: '1', text: 'Хидратация', emoji: '💧', done: false },
    { id: '2', text: 'Пълноценна храна богата на нутриенти', emoji: '🥩', done: false },
    { id: '3', text: 'Прием на добавки', emoji: '💊', done: false },
    { id: '4', text: 'Слънце и чист въздух', emoji: '🌤️', done: false },
    { id: '5', text: 'Тренировка за деня', emoji: '🏋️', done: false },
    { id: '6', text: 'Проследяване на прогреса', emoji: '📈', done: false },
    { id: '7', text: 'Медитация и молитва', emoji: '🧘‍♂️', done: false },
    { id: '8', text: '7-9 часа сън', emoji: '🛌', done: false },
    { id: '9', text: 'Споделяне на успехите в Telegram', emoji: '📘', done: false }
  ];

  // Emoji options
  const emojiOptions = ['🔥', '💪', '🏆', '🎯', '⚡', '🧠', '❤️', '🥗', '🍎', '🚶', '🧘‍♀️', '🏃', '🚴', '🏊', '🥤', '🍚', '🥦', '🥑', '🍗', '🏄', '🌞', '📱'];

  // Helper function for localStorage
  const storage = {
    get: key => localStorage.getItem(key),
    set: (key, value) => localStorage.setItem(key, value),
    today: () => new Date().toDateString()
  };

  // Get items from localStorage
  function getLocalStorageItems() {
    const storedItems = storage.get('flItems');
    const storedDate = storage.get('flDate');
    const today = storage.today();

    // Reset if it's a new day
    if (storedDate !== today) {
      storage.set('flDate', today);
      return defaultItems;
    }

    return storedItems ? JSON.parse(storedItems) : defaultItems;
  }

  // Initialize state
  const state = {
    items: getLocalStorageItems(),
    minimized: false, // Start expanded
    addingItem: false,
    newItemText: '',
    newItemEmoji: '🔥'
  };

  // Save items to localStorage
  function saveItems() {
    storage.set('flItems', JSON.stringify(state.items));
    
    // Set current date for daily reset check
    if (storage.get('flDate') !== storage.today()) {
      storage.set('flDate', storage.today());
    }
  }

  // Calculate completion percentage
  function getPercentage() {
    return Math.round((state.items.filter(item => item.done).length / state.items.length) * 100) || 0;
  }

  // Toggle item completion
  function toggleItem(id) {
    state.items = state.items.map(item => 
      item.id === id ? {...item, done: !item.done} : item
    );
    saveItems();
    renderWidget();
  }

  // Remove item
  function removeItem(id) {
    state.items = state.items.filter(item => item.id !== id);
    saveItems();
    renderWidget();
  }

  // Add new custom item
  function addItem() {
    if (state.newItemText.trim()) {
      const newItem = {
        id: Date.now().toString(),
        text: state.newItemText.trim(),
        emoji: state.newItemEmoji,
        done: false
      };
      state.items = [...state.items, newItem];
      state.newItemText = "";
      state.addingItem = false;
      saveItems();
      renderWidget();
    }
  }

  // Toggle minimized state
  function toggleMinimized() {
    state.minimized = !state.minimized;
    renderWidget();
  }

  // Toggle adding item form
  function toggleAddingItem() {
    state.addingItem = !state.addingItem;
    renderWidget();
    
    // Focus input after rendering
    if (state.addingItem) {
      setTimeout(() => {
        const input = document.querySelector('.fl-new-item-input');
        if (input) input.focus();
      }, 100);
    }
  }

  // Select emoji
  function selectEmoji(emoji) {
    state.newItemEmoji = emoji;
    renderWidget();
  }

  // Render the widget
  function renderWidget() {
    // Remove existing widget if any
    const existingWidget = document.querySelector('.fl-premium');
    if (existingWidget) {
      existingWidget.remove();
    }
    
    const existingOverlay = document.querySelector('.fl-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }
    
    // Create main container
    const container = document.createElement('div');
    container.className = 'fl-premium';
    
    // Create overlay for expanded view
    const overlay = document.createElement('div');
    overlay.className = 'fl-overlay';
    if (!state.minimized) {
      overlay.classList.add('fl-active');
      overlay.addEventListener('click', toggleMinimized);
    }
    document.body.appendChild(overlay);
    
    if (state.minimized) {
      // Minimized view
      const percentage = getPercentage();
      
      container.innerHTML = `
        <div class="fl-minimized" id="fl-open-widget">
          <div class="fl-title">Лист с задачи</div>
          <div class="fl-badge">${percentage}%</div>
        </div>
      `;
      document.body.appendChild(container);
      
      // Add event listener
      document.getElementById('fl-open-widget').addEventListener('click', toggleMinimized);
    } else {
      // Expanded view
      const percentage = getPercentage();
      
      // Generate checklist items HTML
      const itemsHTML = state.items.map((item, index) => `
        <div class="fl-checklist-item" style="--item-index: ${index};">
          <div class="fl-item-checkbox ${item.done ? 'fl-checked' : ''}" data-id="${item.id}">
            <div class="fl-item-check">${icons.check}</div>
          </div>
          <div class="fl-item-emoji">${item.emoji}</div>
          <div class="fl-item-text">${item.text}</div>
          <div class="fl-remove-btn" data-id="${item.id}">
            ${icons.trash}
          </div>
        </div>
      `).join('');
      
      // Generate emoji selector HTML
      const emojiSelectorHTML = emojiOptions.map(emoji => `
        <div class="fl-emoji-option ${state.newItemEmoji === emoji ? 'fl-emoji-selected' : ''}" data-emoji="${emoji}">
          ${emoji}
        </div>
      `).join('');
      
      // Complete expanded view HTML
      container.innerHTML = `
        <div class="fl-expanded">
          <div class="fl-header">
            <div class="fl-logo">
              <div class="fl-logo-icon">FL</div>
              <h1 class="fl-widget-title">
                <span class="fl-title-highlight">Fitness</span> Checklist
              </h1>
            </div>
            <div class="fl-percentage">
              <div class="fl-percentage-circle">
                ${percentage}%
                <div class="fl-progress-bg" style="height: ${100 - percentage}%"></div>
              </div>
              <div class="fl-percentage-label">завършено</div>
            </div>
            <div class="fl-close-btn">
              ${icons.close}
            </div>
          </div>
          
          <div class="fl-content">
            <div class="fl-progress-bar">
              <div class="fl-progress-fill" style="width: ${percentage}%"></div>
            </div>
            
            <div class="fl-checklist-container">
              <div class="fl-checklist-header">
                <div class="fl-section-title">ЕЖЕДНЕВНИ ЗАДАЧИ</div>
              </div>
              
              <div class="fl-checklist-items">
                ${itemsHTML}
              </div>
            </div>
            
            ${state.addingItem ? `
              <div class="fl-new-item-form">
                <div class="fl-emoji-selector">
                  ${emojiSelectorHTML}
                </div>
                <div class="fl-input-row">
                  <div class="fl-selected-emoji">${state.newItemEmoji}</div>
                  <input 
                    type="text" 
                    class="fl-new-item-input" 
                    placeholder="Въведете нова задача..." 
                    value="${state.newItemText}"
                  />
                  <button 
                    class="fl-add-btn" 
                    id="fl-add-item-btn"
                    ${!state.newItemText.trim() ? 'disabled' : ''}
                  >
                    Добави
                  </button>
                </div>
              </div>
            ` : `
              <div class="fl-add-item-container">
                <button class="fl-add-item-btn" id="fl-show-add-form">
                  <div class="fl-plus-icon">${icons.plus}</div>
                  <span>Добави своя задача</span>
                </button>
              </div>
            `}
          </div>
          
          <div class="fl-footer">
            <p>Съставено с <span class="fl-heartbeat">${icons.heart}</span> от Fitness Lifestyle</p>
            <p>Списъкът ще се нулира в полунощ.</p>
          </div>
        </div>
      `;
      
      document.body.appendChild(container);
      
      // Make expanded view visible with animation
      setTimeout(() => {
        const expandedElement = document.querySelector('.fl-expanded');
        if (expandedElement) {
          expandedElement.classList.add('fl-active');
        }
      }, 50);
      
      // Add event listeners
      document.querySelector('.fl-close-btn').addEventListener('click', toggleMinimized);
      
      // Toggle checkboxes
      document.querySelectorAll('.fl-item-checkbox').forEach(el => {
        el.addEventListener('click', () => toggleItem(el.getAttribute('data-id')));
      });
      
      // Remove buttons
      document.querySelectorAll('.fl-remove-btn').forEach(el => {
        el.addEventListener('click', () => removeItem(el.getAttribute('data-id')));
      });
      
      // Add item form or button
      if (state.addingItem) {
        // Emoji selector
        document.querySelectorAll('.fl-emoji-option').forEach(el => {
          el.addEventListener('click', () => selectEmoji(el.getAttribute('data-emoji')));
        });
        
        // Input field
        const input = document.querySelector('.fl-new-item-input');
        input.addEventListener('input', e => {
          state.newItemText = e.target.value;
        });
        input.addEventListener('keydown', e => {
          if (e.key === 'Enter') addItem();
          if (e.key === 'Escape') {
            state.addingItem = false;
            renderWidget();
          }
        });
        
        // Add button
        document.getElementById('fl-add-item-btn').addEventListener('click', addItem);
      } else {
        // Show add form button
        document.getElementById('fl-show-add-form').addEventListener('click', toggleAddingItem);
      }
    }
  }

  // Initialize - autoexpand on load
  renderWidget();
})();
