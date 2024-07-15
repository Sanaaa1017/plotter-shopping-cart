// 目的:點擊加入購物車按鈕的時候，要記錄資料到下一頁使用
// 做一陣列列出首頁的所有商品清單
// 做一陣列用來記錄點擊過的購物清單
// 監聽所有加入購物車按鈕，當被點擊時該商品的索引值push到購物清單陣列
// 點擊過的商品清單要帶到下一頁，所以要存到localStorage
// 因為localStorag只能儲存字串型別的資料，所以用JSON格式把購物清單陣列轉成字串

let item_list = [
  {
    id: '1',
    name: '【送料無料】 5012 6穴リングレザーバインダー リスシオ ミニサイズ',
    img: './image/item01.jpg',
    price: '15950',
  },
  {
    id: '2',
    name: '【送料無料】 5001 6穴リングレザーバインダー プエブロ ミニサイズ',
    img: './image/item02.jpg',
    price: '14850',
  },
  {
    id: '3',
    name: '【送料無料】 5003 6穴リングレザーバインダー シュリンク ミニサイズ',
    img: './image/item03.jpg',
    price: '11550',
  },
  {
    id: '4',
    name: '【送料無料】004 リフィルメモパッド2mm方眼80枚 ミニサイズ',
    img: './image/item04.jpg',
    price: '638',
  },
  {
    id: '5',
    name: '【送料無料】010 リフター2枚 ミニサイズ',
    img: './image/item05.jpg',
    price: '550',
  },
  {
    id: '6',
    name: '【送料無料】011 本革ペンホルダーリフター ミニサイズ',
    img: './image/item06.jpg',
    price: '1320',
  },
];

let shopping_list = [];

let addbtns = document.querySelectorAll('.add_to_cart');
addbtns.forEach((item, index) => {
  item.addEventListener('click', function () {
    // console.log('有點到', index);
    if (!shopping_list.includes(index)) {
      shopping_list.push(index);
    }
    // console.log(typeof (shopping_list), typeof (JSON.stringify(shopping_list)));
    let JSON_shopping_list = JSON.stringify(shopping_list);
    localStorage.setItem("shopping_list", JSON_shopping_list);
    // console.log(localStorage.getItem("shopping_list"));
  });
});