// Fitness Lifestyle Checklist Widget - Enhanced Version
(function(){
  // Create and append styles
  const style = document.createElement('style');
  style.textContent = `
    .fl-cw * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    
    .fl-cw {
      position: fixed;
      bottom: 85px;
      right: 20px;
      z-index: 99999;
      font-size: 16px;
      color: #fff;
      transition: all 0.3s ease;
    }
    
    .fl-min {
      background: #000;
      border: 2px solid #D7FB00;
      border-radius: 24px;
      box-shadow: 0 0 15px rgba(215, 251, 0, 0.5);
      padding: 12px 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 280px;
      transition: all 0.3s ease;
    }
    
    .fl-min:hover {
      box-shadow: 0 0 20px rgba(215, 251, 0, 0.7);
      transform: translateY(-2px);
    }
    
    .fl-title {
      font-weight: 700;
      color: #D7FB00;
      margin-right: 8px;
    }
    
    .fl-badge {
      background: #D7FB00;
      color: #000;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 50px;
      font-size: 14px;
    }
    
    .fl-exp {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 500px;
      max-height: 80vh;
      background: #000;
      border-radius: 24px;
      border: 2px solid #D7FB00;
      box-shadow: 0 0 20px rgba(215, 251, 0, 0.5);
      overflow-y: auto;
      z-index: 100000;
      animation: fl-popup 0.3s ease-out;
    }
    
    @keyframes fl-popup {
      0% { 
        opacity: 0; 
        transform: translate(-50%, -40%);
      }
      100% { 
        opacity: 1; 
        transform: translate(-50%, -50%);
      }
    }
    
    .fl-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #333;
    }
    
    .fl-wtitle {
      font-size: 22px;
      font-weight: 900;
      letter-spacing: -0.5px;
    }
    
    .fl-hilight {
      color: #D7FB00;
    }
    
    .fl-circle {
      background: #D7FB00;
      color: #000;
      font-size: 18px;
      font-weight: 700;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 15px rgba(215, 251, 0, 0.5);
    }
    
    .fl-box {
      background: #0E0E0E;
      border-radius: 16px;
      margin: 16px;
      overflow: hidden;
      border: 1px solid #222;
    }
    
    .fl-boxhead {
      display: flex;
      justify-content: space-between;
      padding: 14px 16px;
      background: #111;
      border-bottom: 1px solid #222;
    }
    
    .fl-sectitle {
      font-size: 14px;
      color: #999;
      font-weight: 500;
    }
    
    .fl-minbtn {
      cursor: pointer;
      color: #666;
      font-size: 18px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s;
    }
    
    .fl-minbtn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }
    
    .fl-items {
      display: flex;
      flex-direction: column;
      max-height: 50vh;
      overflow-y: auto;
    }
    
    .fl-items::-webkit-scrollbar {
      width: 8px;
    }
    
    .fl-items::-webkit-scrollbar-track {
      background: #0a0a0a;
      border-radius: 4px;
    }
    
    .fl-items::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 4px;
    }
    
    .fl-items::-webkit-scrollbar-thumb:hover {
      background: #444;
    }
    
    .fl-item {
      display: flex;
      align-items: center;
      padding: 14px 16px;
      border-bottom: 1px solid #222;
      transition: background-color 0.2s;
    }
    
    .fl-item:last-child {
      border-bottom: none;
    }
    
    .fl-item:hover {
      background: #1A1A1A;
    }
    
    .fl-check {
      cursor: pointer;
      margin-right: 14px;
      color: #555;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s;
    }
    
    .fl-check:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #888;
    }
    
    .fl-check.fl-active {
      color: #D7FB00;
    }
    
    .fl-emoji {
      margin-right: 10px;
      font-size: 18px;
    }
    
    .fl-text {
      flex-grow: 1;
      line-height: 1.4;
    }
    
    .fl-done {
      text-decoration: line-through;
      color: #555;
    }
    
    .fl-remove {
      opacity: 0;
      color: #555;
      cursor: pointer;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s;
    }
    
    .fl-item:hover .fl-remove {
      opacity: 1;
    }
    
    .fl-remove:hover {
      background: rgba(255, 0, 0, 0.1);
      color: #ff6b6b;
    }
    
    .fl-add {
      margin: 16px;
    }
    
    .fl-addbtn {
      width: 100%;
      background: #111;
      color: #999;
      border: 1px solid #222;
      border-radius: 16px;
      padding: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s;
      font-size: 14px;
    }
    
    .fl-addbtn:hover {
      background: #191919;
      color: #fff;
    }
    
    .fl-plus {
      color: #D7FB00;
      font-size: 16px;
      font-weight: bold;
    }
    
    .fl-form {
      background: #111;
      border-radius: 16px;
      padding: 16px;
      margin: 16px;
      border: 1px solid #222;
    }
    
    .fl-emojis {
      display: flex;
      overflow-x: auto;
      gap: 8px;
      margin-bottom: 16px;
      padding-bottom: 4px;
    }
    
    .fl-emojis::-webkit-scrollbar {
      height: 4px;
    }
    
    .fl-emojis::-webkit-scrollbar-track {
      background: #0a0a0a;
      border-radius: 4px;
    }
    
    .fl-emojis::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 4px;
    }
    
    .fl-emoji-opt {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 18px;
    }
    
    .fl-emoji-opt:hover {
      background: #222;
    }
    
    .fl-emoji-sel {
      background: rgba(215, 251, 0, 0.2);
    }
    
    .fl-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .fl-sel-em {
      font-size: 22px;
    }
    
    .fl-input {
      flex-grow: 1;
      background: #222;
      border: none;
      border-radius: 8px;
      padding: 12px;
      color: #fff;
      font-size: 14px;
    }
    
    .fl-input:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(215, 251, 0, 0.3);
    }
    
    .fl-submit {
      background: #D7FB00;
      color: #000;
      font-weight: 500;
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .fl-submit:hover:not(:disabled) {
      background: #ecff5b;
      transform: translateY(-1px);
    }
    
    .fl-submit:active:not(:disabled) {
      transform: translateY(1px);
    }
    
    .fl-submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .fl-footer {
      text-align: center;
      padding: 16px;
      color: #666;
      font-size: 14px;
      font-style: italic;
    }
    
    @media (max-width: 600px) {
      .fl-exp {
        width: 95%;
        max-height: 85vh;
      }
    }
  `;
  document.head.appendChild(style);

  // Default items with more detailed descriptions
  const defaultItems = [
    {id: "1", text: "Хидратация", emoji: "💧", done: false},
    {id: "2", text: "Пълноценна храна богата на нутриенти", emoji: "🥩", done: false},
    {id: "3", text: "Прием на добавки", emoji: "💊", done: false},
    {id: "4", text: "Слънце и чист въздух", emoji: "🌤️", done: false},
    {id: "5", text: "Тренировка за деня", emoji: "🏋️", done: false},
    {id: "6", text: "Проследяване на прогреса", emoji: "📈", done: false},
    {id: "7", text: "Медитация и молитва", emoji: "🧘‍♂️", done: false},
    {id: "8", text: "7-9 часа сън", emoji: "🛌", done: false},
    {id: "9", text: "Споделяне на прогреса в групата в Telegram", emoji: "📘", done: false}
  ];

  // Emoji options - extended set
  const emojis = [
    "🔥", "💪", "🏆", "🎯", "⚡", "🧠", "❤️", "🥗", "🍎", "🚶", 
    "🧘‍♀️", "🏃", "🚴", "🏊", "🥤", "🍚", "⏱️", "📝", "🌱", "✨"
  ];

  // Helper functions for localStorage
  const getItem = (key) => localStorage.getItem(key);
  const setItem = (key, value) => localStorage.setItem(key, value);
  const today = () => new Date().toDateString();

  // Get checklist items from localStorage
  function getStoredItems() {
    const stored = getItem("flItems");
    const storedDate = getItem("flDate");
    const currentDate = today();
    
    // Reset if it's a new day
    if (storedDate !== currentDate) {
      setItem("flDate", currentDate);
      return defaultItems;
    }
    
    return stored ? JSON.parse(stored) : defaultItems;
  }

  // State management
  const state = {
    items: getStoredItems(),
    minimized: false, // Start with checklist open
    adding: false,
    newText: "",
    newEmoji: "🔥"
  };

  // Save items to localStorage
  function saveItems() {
    setItem("flItems", JSON.stringify(state.items));
    
    // Set current date for daily reset check
    if (getItem("flDate") !== today()) {
      setItem("flDate", today());
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
    if (state.newText.trim()) {
      const newItem = {
        id: Date.now().toString(),
        text: state.newText.trim(),
        emoji: state.newEmoji,
        done: false
      };
      state.items = [...state.items, newItem];
      state.newText = "";
      state.adding = false;
      saveItems();
      renderWidget();
    }
  }

  // Create and render the widget
  function renderWidget() {
    // Remove existing widget if any
    const existingWidget = document.querySelector('.fl-cw');
    if (existingWidget) {
      existingWidget.remove();
    }
    
    // Create new container
    const container = document.createElement('div');
    container.className = 'fl-cw';
    
    if (state.minimized) {
      // Minimized view
      const percent = getPercentage();
      container.innerHTML = `
        <div class="fl-min">
          <div class="fl-title">ЛИСТ СЪС ЗАДАЧИ</div>
          <div class="fl-badge">${percent}%</div>
        </div>
      `;
      
      // Add event listener
      container.querySelector('.fl-min').addEventListener('click', function() {
        state.minimized = false;
        renderWidget();
      });
    } else {
      // Expanded view
      const percent = getPercentage();
      
      // Generate items HTML
      const itemsHTML = state.items.map(item => `
        <div class="fl-item">
          <div class="fl-check ${item.done ? 'fl-active' : ''}" data-id="${item.id}">
            ${item.done ? '✓' : '○'}
          </div>
          <div class="fl-emoji">${item.emoji}</div>
          <div class="fl-text ${item.done ? 'fl-done' : ''}">${item.text}</div>
          <div class="fl-remove" data-rmid="${item.id}">×</div>
        </div>
      `).join('');
      
      // Generate emoji selector HTML if adding
      const emojiHTML = state.adding ? emojis.map(emoji => `
        <div class="fl-emoji-opt ${state.newEmoji === emoji ? 'fl-emoji-sel' : ''}" data-emoji="${emoji}">
          ${emoji}
        </div>
      `).join('') : '';
      
      // Complete expanded view HTML
      container.innerHTML = `
        <div class="fl-exp">
          <div class="fl-head">
            <div class="fl-wtitle"><span class="fl-hilight">FL</span> CHECKLIST</div>
            <div class="fl-circle">${percent}%</div>
          </div>
          
          <div class="fl-box">
            <div class="fl-boxhead">
              <div class="fl-sectitle">ЕЖЕДНЕВНИ ЗАДАЧИ</div>
              <div class="fl-minbtn">✕</div>
            </div>
            
            <div class="fl-items">
              ${itemsHTML}
            </div>
          </div>
          
          ${state.adding ? `
            <div class="fl-form">
              <div class="fl-emojis">
                ${emojiHTML}
              </div>
              <div class="fl-row">
                <div class="fl-sel-em">${state.newEmoji}</div>
                <input 
                  type="text" 
                  class="fl-input" 
                  placeholder="Въведете нова задача..." 
                  value="${state.newText}"
                />
                <button 
                  class="fl-submit" 
                  id="fl-submit-btn"
                  ${!state.newText.trim() ? 'disabled' : ''}
                >
                  Добави
                </button>
              </div>
            </div>
          ` : `
            <div class="fl-add">
              <button class="fl-addbtn">
                <span class="fl-plus">+</span>
                <span>Добави задача</span>
              </button>
            </div>
          `}
          
          <div class="fl-footer">
            <p>Списъкът ще се нулира в полунощ.</p>
          </div>
        </div>
      `;
      
      document.body.appendChild(container);
      
      // Add event listeners after the DOM is updated
      // Minimize button - now with X icon
      container.querySelector('.fl-minbtn').addEventListener('click', function() {
        state.minimized = true;
        renderWidget();
      });
      
      // Toggle checkboxes
      container.querySelectorAll('.fl-check').forEach(el => {
        el.addEventListener('click', function() {
          toggleItem(this.getAttribute('data-id'));
        });
      });
      
      // Remove buttons
      container.querySelectorAll('.fl-remove').forEach(el => {
        el.addEventListener('click', function() {
          removeItem(this.getAttribute('data-rmid'));
        });
      });
      
      // Add item form or button
      if (state.adding) {
        // Emoji options
        container.querySelectorAll('.fl-emoji-opt').forEach(el => {
          el.addEventListener('click', function() {
            state.newEmoji = this.getAttribute('data-emoji');
            renderWidget();
          });
        });
        
        // Input field
        const input = container.querySelector('.fl-input');
        input.addEventListener('input', function() {
          state.newText = this.value;
        });
        input.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') addItem();
        });
        
        // Focus input after rendering
        setTimeout(() => input.focus(), 0);
        
        // Add button - Fixed the button click handler
        document.getElementById('fl-submit-btn').addEventListener('click', addItem);
      } else {
        // Show add form button
        container.querySelector('.fl-addbtn').addEventListener('click', function() {
          state.adding = true;
          renderWidget();
        });
      }
      
      return;
    }
    
    // Add to page
    document.body.appendChild(container);
  }

  // Initialize
  renderWidget();
})();
