let currentLevel = 1;
const totalLevels = 4;

function updateProgress() {
    const progress = ((currentLevel - 1) / totalLevels) * 100;
    document.getElementById('progress').style.width = progress + '%';
}

function showLevel(level) {
    document.querySelectorAll('.challenge').forEach(challenge => {
        challenge.classList.remove('active');
    });
    document.getElementById(`challenge-${level}`).classList.add('active');
}

function checkHTML() {
    const input = document.getElementById('html-input').value;
    const feedback = document.getElementById('html-feedback');
    const preview = document.getElementById('html-preview');
    
    // Обновляем предпросмотр
    preview.innerHTML = input;
    
    if (input.includes('<h1>') && input.includes('</h1>') && 
        (input.includes('<p>') || input.includes('<div>'))) {
        feedback.className = 'feedback success';
        feedback.innerHTML = '✅ Отлично! Ты создал правильную структуру HTML!';
        setTimeout(() => {
            currentLevel = 2;
            showLevel(2);
            updateProgress();
        }, 1500);
    } else {
        feedback.className = 'feedback error';
        feedback.innerHTML = '❌ Почти! Убедись, что используешь теги h1 и p/div';
    }
}

function checkCSS() {
    const select = document.getElementById('css-select');
    const feedback = document.getElementById('css-feedback');
    const preview = document.getElementById('css-preview');
    
    // Применяем стили к предпросмотру
    if (select.value) {
        preview.querySelector('h1').style = select.value;
    }
    
    if (select.value === "color: blue; text-align: center;") {
        feedback.className = 'feedback success';
        feedback.innerHTML = '🎨 Прекрасно! Страница стала выглядеть намного лучше!';
        setTimeout(() => {
            currentLevel = 3;
            showLevel(3);
            updateProgress();
        }, 1500);
    } else {
        feedback.className = 'feedback error';
        feedback.innerHTML = '🎨 Не совсем... Попробуй сделать заголовок синим и выровнять по центру';
    }
}

function checkJS() {
    const input = document.getElementById('js-input').value.toLowerCase();
    const feedback = document.getElementById('js-feedback');
    const resultDiv = document.getElementById('js-result');
    const button = document.getElementById('myButton');
    
    // Очищаем предыдущие обработчики
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    
    // Добавляем новый обработчик
    newButton.addEventListener('click', function() {
        if (input.includes('alert')) {
            alert('Отлично! JavaScript работает!');
        } else if (input.includes('изменить') || input.includes('change')) {
            resultDiv.innerHTML = '<p>Текст изменен с помощью JavaScript!</p>';
        } else {
            resultDiv.innerHTML = '<p>Что-то произошло!</p>';
        }
    });
    
    if (input.includes('alert') || input.includes('изменить') || input.includes('change')) {
        feedback.className = 'feedback success';
        feedback.innerHTML = '⚡ Удивительно! JavaScript оживил твою страницу!';
        setTimeout(() => {
            currentLevel = 4;
            showLevel(4);
            updateProgress();
        }, 1500);
    } else {
        feedback.className = 'feedback error';
        feedback.innerHTML = '⚡ Интересная идея, но попробуй добавить всплывающее окно или изменить содержимое страницы';
    }
}

function checkCombined() {
    const feedback = document.getElementById('combined-feedback');
    const preview = document.getElementById('combined-preview');
    
    // Создаем работающий счетчик в предпросмотре
    preview.innerHTML = `
        <div class="counter">
            <button id="decrease">-</button>
            <span id="count">0</span>
            <button id="increase">+</button>
        </div>
        <style>
            .counter {
                display: flex;
                gap: 10px;
                align-items: center;
                font-size: 1.5em;
            }
            .counter button {
                width: 40px;
                height: 40px;
                font-size: 1.2em;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        </style>
    `;
    
    let count = 0;
    const countElement = preview.querySelector('#count');
    const decreaseBtn = preview.querySelector('#decrease');
    const increaseBtn = preview.querySelector('#increase');
    
    decreaseBtn.addEventListener('click', function() {
        count--;
        countElement.textContent = count;
    });
    
    increaseBtn.addEventListener('click', function() {
        count++;
        countElement.textContent = count;
    });
    
    feedback.className = 'feedback success';
    feedback.innerHTML = '🔗 Идеально! Ты создал полноценный интерактивный элемент!';
    
    setTimeout(() => {
        document.getElementById('completion').style.display = 'block';
        document.querySelectorAll('.challenge').forEach(challenge => {
            challenge.style.display = 'none';
        });
    }, 2000);
}

function showHint(level) {
    const feedback = document.getElementById('combined-feedback');
    feedback.className = 'feedback success';
    feedback.innerHTML = '💡 Подсказка: Нужно добавить обработчики событий для кнопок, которые изменяют переменную count и обновляют текст в span';
}

function restartQuest() {
    currentLevel = 1;
    updateProgress();
    showLevel(1);
    document.getElementById('completion').style.display = 'none';
    
    // Сброс всех полей ввода
    document.getElementById('html-input').value = '';
    document.getElementById('css-select').selectedIndex = 0;
    document.getElementById('js-input').value = '';
    
    // Очистка предпросмотров
    document.getElementById('html-preview').innerHTML = '';
    document.getElementById('css-preview').querySelector('h1').style = '';
    document.getElementById('js-result').innerHTML = '';
    document.getElementById('combined-preview').innerHTML = '';
}

// Инициализация
updateProgress();
