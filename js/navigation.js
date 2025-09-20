// Об'єкт з відповідностями класів меню та URL
const pageMap = {
    'main_page': 'index.html',
    'cats': 'cats.html',
    'game_wiki': 'wiki.html', 
    'games': 'games.html',
    'serials': 'serials.html',
    'crypta': 'crypto.html',
    'music_block': 'music.html',
    'code_vs': 'vscode.html',
    'sports': 'sport.html'
};

// Об'єкт для відповідності класів категорій до класів меню
const categoryToMenuMap = {
    'categories__cats': 'cats',
    'categories__wiki': 'game_wiki',
    'categories__games': 'games', 
    'categories__serials': 'serials',
    'categories__crypto': 'crypta',
    'categories__music': 'music_block',
    'categories__vscode': 'code_vs',
    'categories__sport': 'sports'
};

// Функція для перенаправлення
function redirectToPage(pageKey) {
    if (pageMap[pageKey]) {
        window.location.href = pageMap[pageKey];
    }
}

// Обробник для меню (li елементи)
document.querySelectorAll('.menu__list').forEach(item => {
    const pageClass = Array.from(item.classList).find(cls => pageMap[cls]);
    
    if (pageClass) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            redirectToPage(pageClass);
        });
    }
});

// Обробник для кнопок в категоріях
document.querySelectorAll('.categories__button').forEach(button => {
    button.addEventListener('click', function() {
        // Знаходимо батьківський елемент з класом categories__item
        const parentItem = this.closest('.categories__item');
        
        if (parentItem) {
            // Шукаємо клас, який є в categoryToMenuMap
            const categoryClass = Array.from(parentItem.classList)
                .find(cls => categoryToMenuMap[cls]);
            
            if (categoryClass) {
                const menuClass = categoryToMenuMap[categoryClass];
                redirectToPage(menuClass);
            }
        }
    });
});