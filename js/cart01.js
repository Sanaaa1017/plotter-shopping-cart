// 目的:取得資料顯示在畫面上
// 取得存到localStorag點擊過的商品清單資料
// 字串轉回陣列 parse
// 過濾要顯示的產品(判斷索引值有沒有在點擊的陣列裡面) filter
// 把過濾完的資料顯示在購物車頁面上，直接複製格式
// data-price

// 目的:數量增減鍵能操作，價錢跟著變化，下方數量、小計加總
// 先綁完單個按鈕的監聽事件，再換成多個
// 計算所有數量
// 計算商品數量*金額
// 下方顯示總數量
// 下方顯示商品總計
// 更新暫存數量

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

// console.log(localStorage.getItem('shopping_list'));
let shopping_list = JSON.parse(localStorage.getItem('shopping_list'));
// console.log(shopping_list);

// 方法一
// let list_show = [];
// item_list.forEach((item, index) => {
//     if (shopping_list.includes(index)) {
//         list_show.push(item);
//     }
// });

// 方法二
// const list_show = item_list.filter((item, index) => {
//     if (shopping_list.includes(index)) {
//         return item;
//     }
// });

// 方法二縮寫
// const list_show = item_list.filter((item, index) => shopping_list.includes(index));
// console.log(list_show);

// let list_show = [];
// item_list.forEach((index) => {
//     if (shopping_list.includes(index)) {
//         // list_show.push(item);
//         list_show.push(item_list[index]);
//     }
// });

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
        <td class="price_show col-2" data-price="${item.price}">${item.price * 1}円(税込)</td>
        <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                <button type="button" class="minus_btn btn btn-outline-dark btn-sm">-</button>
                <input type="number" min="1" value="1" class="quantity text-center" style="width: 35px;">
                <button type="button" class="plus_btn btn btn-dark btn-sm">+</button>
            </div>
        </td>
        <td><button type="button" class="cancel_btn btn" data-cancelbtn="${shopping_list[index]}">削除></button></td>
    </tr>
    `;
});

quantity_btn();
cancel_btn();
total_quantity_show();
total_price_show();
tm_storage_quantity();
tm_storage_price();

// 功能:數量刪減按鈕
function quantity_btn() {
    let every_quantity = document.querySelectorAll('.quantity');
    let every_price_show = document.querySelectorAll('.price_show');

    let minus_btns = document.querySelectorAll('.minus_btn');
    minus_btns.forEach((item, index) => {
        item.addEventListener('click', function () {
            let quantity = every_quantity[index];
            quantity.value = parseInt(quantity.value) - 1;
            let price_show = every_price_show[index];
            // price_show.dataset.price 金額
            // quantity.value 數量
            price_show.innerHTML = `${price_show.dataset.price * quantity.value}円(税込)`;
            total_quantity_show();
            total_price_show();
            tm_storage_quantity(); //更新暫存
            tm_storage_price();
        });
    });
    let plus_btns = document.querySelectorAll('.plus_btn');
    plus_btns.forEach((item, index) => {
        item.addEventListener('click', function () {
            let quantity = every_quantity[index];
            quantity.value = parseInt(quantity.value) + 1;
            let price_show = every_price_show[index];
            // price_show.dataset.price 金額
            // quantity.value 數量
            price_show.innerHTML = `${price_show.dataset.price * quantity.value}円(税込)`;
            total_quantity_show();
            total_price_show();
            tm_storage_quantity(); //更新暫存
            tm_storage_price();
        });
    });
}

function cancel_btn() {
    let cancel_btns = document.querySelectorAll('.cancel_btn');
    cancel_btns.forEach((btn) => {
        btn.addEventListener('click', function () {
            // 刪除list_show裡面的品項
            let row = btn.closest('tr');
            row.remove();
            // 從購物車中刪除shopping_list裡面的陣列索引
            let index_cancel = shopping_list.indexOf(parseInt(btn.dataset.cancelbtn));
            // console.log(index_cancel);
            shopping_list.splice(index_cancel, 1);
            // 更新localStorage
            localStorage.setItem("shopping_list", JSON.stringify(shopping_list));
            // 移除對應的行
            total_quantity_show();
            total_price_show();
            tm_storage_quantity();
            tm_storage_price();
        });
    });
}

// 功能:顯示總數量
function total_quantity_show() {
    let every_quantity = document.querySelectorAll('.quantity');
    let quantity = 0;
    every_quantity.forEach((item) => {
        quantity += parseInt(item.value);
    });
    let total_quantity_show = document.querySelector('#total_quantity_show');
    total_quantity_show.innerHTML = quantity;
}

// 功能:顯示總價格
function total_price_show() {
    let every_quantity = document.querySelectorAll('.quantity');
    let every_price_show = document.querySelectorAll('.price_show');
    let price = 0;
    every_quantity.forEach((item, index) => {
        let price_show = every_price_show[index];
        price = price + price_show.dataset.price * parseInt(item.value);
    });
    let total_price_show = document.querySelector('#total_price_show');
    total_price_show.innerHTML = `${price}円`;
    // console.log(total_price_show);
}

// 功能:暫存數量(每一項)
function tm_storage_quantity() {
    let quantity = [];
    let every_quantity = document.querySelectorAll('.quantity');
    every_quantity.forEach((item) => {
        quantity.push(parseInt(item.value));
    });
    let JSON_total_quantity = JSON.stringify(quantity);
    localStorage.setItem("total_quantity", JSON_total_quantity);
}

// 功能:暫存價錢(每一項)
function tm_storage_price() {
    let price = [];
    let every_quantity = document.querySelectorAll('.quantity');
    let every_price_show = document.querySelectorAll('.price_show');
    every_quantity.forEach((item, index) => {
        let price_show = every_price_show[index];
        price.push(price_show.dataset.price * parseInt(item.value));
    });
    let JSON_total_price = JSON.stringify(price);
    localStorage.setItem("total_price", JSON_total_price);
    // console.log(price);
}


