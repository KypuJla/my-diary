const noteInput = document.getElementById('note-input');
const addBtn = document.getElementById('add-btn');
const notesList = document.getElementById('notes-list');

// Загружаем заметки и конвертируем старый формат (просто строки) в новый (объекты)
let notes = JSON.parse(localStorage.getItem('notes')) || [];
notes = notes.map(n => typeof n === 'string' ? { text: n, important: false } : n);

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
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
    if (text) {
        notes.push({ text: text, important: false });
        saveNotes();
        renderNotes();
        noteInput.value = '';
    }
});

renderNotes();