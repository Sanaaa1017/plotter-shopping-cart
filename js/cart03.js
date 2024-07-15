let item_list = [
    {
        id: '1',
        name: '【送料無料】 5012 6穴リングレザーバインダー リスシオ ミニサイズ',
        img: '../image/item01.jpg',
        price: '15950',
    },
    {
        id: '2',
        name: '【送料無料】 5001 6穴リングレザーバインダー プエブロ ミニサイズ',
        img: '../image/item02.jpg',
        price: '14850',
    },
    {
        id: '3',
        name: '【送料無料】 5003 6穴リングレザーバインダー シュリンク ミニサイズ',
        img: '../image/item03.jpg',
        price: '11550',
    },
    {
        id: '4',
        name: '【送料無料】004 リフィルメモパッド2mm方眼80枚 ミニサイズ',
        img: '../image/item04.jpg',
        price: '638',
    },
    {
        id: '5',
        name: '【送料無料】010 リフター2枚 ミニサイズ',
        img: '../image/item05.jpg',
        price: '550',
    },
    {
        id: '6',
        name: '【送料無料】011 本革ペンホルダーリフター ミニサイズ',
        img: '../image/item06.jpg',
        price: '1320',
    },
];

total_quantity_show();
total_price_show();
user_shopping_show();

let shopping_list = JSON.parse(localStorage.getItem('shopping_list'));
let total_quantity = JSON.parse(localStorage.getItem('total_quantity'));
let total_price = JSON.parse(localStorage.getItem('total_price'));
let user = JSON.parse(localStorage.getItem('user'));

let list_show = [];
shopping_list.forEach((item) => {
    list_show.push(item_list[item]);
});

let cart_list = document.querySelector('#cart_list');
list_show.forEach((item, index) => {
    // console.log(item);
    cart_list.innerHTML += `
    <tr> 
        <th><img src="${item.img}" alt="" width="100"></th>
        <td>${item.name}</td>
        <td class="price_show col-2" data-price="${total_price[index]}">${total_price[index] * 1}円(税込)</td>
        <td type="number" min="1" value="1" class="quantity text-center" style="width: 35px;">${total_quantity[index]}</td>
    </tr>
    `;
});

function total_quantity_show() {
    let total_quantity = JSON.parse(localStorage.getItem('total_quantity'));
    let sum = 0;
    for (let i = 0; i < total_quantity.length; i++) {
        sum = sum + total_quantity[i];
    }
    let total_quantity_show = document.querySelector('#total_quantity_show');
    total_quantity_show.innerHTML = sum;
}

function total_price_show() {
    let total_price = JSON.parse(localStorage.getItem('total_price'));
    let sum = 0;
    for (let i = 0; i < total_price.length; i++) {
        sum = sum + total_price[i];
    }
    let total_price_show = document.querySelector('#total_price_show');
    total_price_show.innerHTML = `${sum}円`;
}

function user_shopping_show() {
    let user = JSON.parse(localStorage.getItem('user'));
    document.querySelector('#name01').innerHTML = user.name01;
    document.querySelector('#name02').innerHTML = user.name02;
    document.querySelector('#phone_number').innerHTML = user.phone;
    document.querySelector('#email').innerHTML = user.email;
    document.querySelector('#city').innerHTML = user.city;
    document.querySelector('#postcode').innerHTML = user.postcode;
    document.querySelector('#address').innerHTML = user.address;
}
