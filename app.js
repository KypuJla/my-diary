const noteInput = document.getElementById('note-input');
const addBtn = document.getElementById('add-btn');
const notesList = document.getElementById('notes-list');

// Загружаем заметки и конвертируем старый формат (просто строки) в новый (объекты)
let notes = JSON.parse(localStorage.getItem('notes')) || [];
notes = notes.map(n => typeof n === 'string' ? { text: n, important: false } : n);

function saveNotes() {
    try {
        localStorage.setItem('notes', JSON.stringify(notes));
    } catch (e) {
        alert("Ошибка сохранения: хранилище переполнено или недоступно.");
    }
}
function renderNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        
        // Звёздочка
        const starBtn = document.createElement('button');
        starBtn.textContent = note.important ? '★' : '☆';
        starBtn.style.marginRight = '10px';
        starBtn.onclick = () => {
            notes[index].important = !notes[index].important;
            saveNotes();
            renderNotes();
        };
        
        // Текст
        const span = document.createElement('span');
        span.textContent = note.text;
        if (note.important) span.style.fontWeight = 'bold';

        // Удаление
        const delBtn = document.createElement('button');
        delBtn.textContent = 'X';
        delBtn.onclick = () => {
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        };

        li.appendChild(starBtn);
        li.appendChild(span);
        li.appendChild(delBtn);
        notesList.appendChild(li);
    });
}

addBtn.addEventListener('click', () => {
    const text = noteInput.value.trim();
    
    // Проверка 1: пустой ввод
    if (!text) {
        alert("Ошибка: Заметка не может быть пустой!");
        return;
    }

    // Проверка 2: слишком длинный текст
    if (text.length > 500) {
        alert("Ошибка: Заметка слишком длинная (максимум 500 символов).");
        return;
    }

    notes.push({ text: text, important: false });
    saveNotes();
    renderNotes();
    noteInput.value = '';
});

noteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

renderNotes();