import { menuItems } from "./data.js";

const menuContainer = document.querySelector('.menu-container');


window.addEventListener('DOMContentLoaded', () => {
    renderHTML(menuItems)
})

function renderFilterMenuItems(category) {
    let item = menuItems.filter(filterItem => {
        if (filterItem.category === category) {
            return true
        }
        else if (category === 'all') {
            return menuItems
        }
    })
    return item
}

function renderHTML(menu) {
    let menuHTML = menu.map(items => {
        return `
                <section class="menu">
                <div class="image-container">
                    <img src="${items.image}" alt="">
                </div>
                <div class="item-desc">
                    <h2 class="item-name">${items.name}</h2>
                    <p class="item-price">${items.price}</p>
                </div>
                <hr>
                <div class="item-info">
                    <p>${items.description}</p>
                </div>
            </section>
        `
    })
    menuHTML = menuHTML.join("")
    menuContainer.innerHTML = menuHTML
}

function uniqueCategory(menu) {
    let unique = [];
    for (const items of menu) {
        if (!unique.includes(items.category)) {
            unique.push(items.category)
        }
    }
    return unique;
}

function createUniqueCategoryButtons(unique) {
    let buttonHTML = ''
    unique.forEach(category => {
        buttonHTML = `<button class="menu-btn" data-category="${category}">${category}</button>`
        document.querySelector('.menu-buttons').innerHTML += buttonHTML;
    })
}

createUniqueCategoryButtons(uniqueCategory(menuItems))

const buttons = document.querySelectorAll('.menu-btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        let filteredItem = renderFilterMenuItems(category)
        renderHTML(filteredItem)
    })
})