window.addEventListener('load',()=>{
   fetch('/cart.js')
        .then(response => response.json())
        .then(response => {
             const items = response.items;
               let itemfinalPrice = false;
               items.forEach(function(item) {
                  if(item.final_price == 0){
                    itemfinalPrice = true;
                 }
               })
            if(!itemfinalPrice){
             const totlaprice = response.total_price;
             const pricevalue = totlaprice/100;
             // console.log('pricevalue',pricevalue)
             if(pricevalue >= 2000){
               free_gift();
             }
             }else{
             const totlaprice = response.total_price;
             const pricevalue = totlaprice/100;
             console.log('pricevalue',pricevalue)  
               Remove_free_gift();
             }  
           }
   ); 
})
// free gift add 
function free_gift(){
const vid = 40633461440586;
const qyantity = 1;
  fetch(`/cart/add.js?id=${vid}&qty=${qyantity}`,{
    method:"POST"
  })
  .then(res => res.json())
  .then(res =>{
    console.log('Add Product in cart');
  })
  .catch(error =>{
    console.log('error');
  })
}
// remove free gift add 
function Remove_free_gift(){
const vid = 40633461440586;
const qyantity = 0;
  fetch(`/cart/change.js?id=${vid}&qty=${qyantity}`,{
    method:"GET"
  })
  .then(res => res.json())
  .then(res =>{
    console.log('Remove product>>>>>');
  })
  .catch(error =>{
    console.log('error');
  })
}
// auto writer placeholder
let staticPlaceholder = "Search for ";
let searcharray = [
  "Shoes",
  "Slipper",
  "Boots",
  "Sandals",
  "Lofos",
  "Combos",
  "Mixes"
];
console.log('searcharray',searcharray);
let dynamicPlaceholder = "";
let searchPlaceholderIndex = 0;
let offset = 0;
let len = searcharray.length;
let forwards = true;
let skip_count = 0;
let skip_delay = 15;
let speed = 100;
function type() {  
  setInterval(function() {    
    if (forwards) {
      if (offset >= searcharray[searchPlaceholderIndex].length) {
        ++ skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    } else {
      if (offset == 0) {
        forwards = true;
        searchPlaceholderIndex++;
        offset = 0;
        if (searchPlaceholderIndex >= len) {
          searchPlaceholderIndex = 0;
       }
      }
    } dynamicPlaceholder = searcharray[searchPlaceholderIndex].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
       offset++;
      } else {
        offset--;
      }
    }
    document.querySelectorAll('.site-header__search-input').forEach(search_el => {
      search_el.setAttribute("placeholder", staticPlaceholder + dynamicPlaceholder);
    });
  }, speed);
};
type();

// show pincode popup js
var btnContainer = document.getElementById('pincode__popup-open').addEventListener('click',function(){
  var popupbody =  document.getElementsByClassName("pincode-popup-container")[0];
  popupbody.classList.add("d-block");
   var Setpincode = localStorage.getItem("pincode");
    console.log("Setpincode",Setpincode);
  document.getElementById('pincode__field').value = Setpincode;
});

// close pincode popup close btn js

var closePopup = document.getElementById('pincode_close_btn').addEventListener('click',function() {
   var closePopupClass = document.getElementsByClassName('pincode-popup-container')[0];
    closePopupClass.classList.remove('d-block');
})

// onwindow load set pincode;

window.addEventListener('load',function(){
  var Setpincode = localStorage.getItem("pincode");
  // console.log('Setpincode',Setpincode.length);
  if(Setpincode?.length > 0 ){
  document.getElementById('pincodevalue').innerHTML = Setpincode;
  document.getElementsByClassName('Enter__pincode__text')[0].innerHTML = 'Delivery to';
  document.getElementById('pincode__popup-open').innerHTML = "Change";
  }else{
     document.getElementsByClassName('Enter__pincode__text')[0].innerHTML = 'Enter Pincode';
     document.getElementById('pincode__popup-open').innerHTML = "Add.";
  }
})

// match pincode js
  document.getElementById('match_pincode').addEventListener('click',function() {
  var inputPINValue = document.getElementById('pincode__field').value;
  // console.log(inputPINValue);
  if(inputPINValue){
  if(inputPINValue.length == 6){
  localStorage.setItem("pincode",inputPINValue);
  var Setpincode = localStorage.getItem("pincode");
  console.log("Setpincode",Setpincode);
  document.getElementById('pincodevalue').innerHTML = Setpincode;
  var closePopupClass = document.getElementsByClassName('pincode-popup-container')[0];
  closePopupClass.classList.remove('d-block');
  document.getElementsByClassName('Enter__pincode__text')[0].innerHTML = 'Delivery to';
  document.getElementById('pincode__popup-open').innerHTML = "Change.";
  }else{
    var wrongPincode =  document.getElementById('invalid__pin').innerHTML = "Please  Enter Valid Pincode";
  }
  }
  else{
  var wrongPincode =  document.getElementById('invalid__pin').innerHTML = "Please enter Pincode";
    wrongPincode.style.color = "red";
  }
})

// quantity Plus js collection page
document.getElementById('btn_plus')?.addEventListener('click',function(ent){
var plushbtn = this.parentElement.querySelector('.quantity__input_value');
var UpdateQuaintity = plushbtn.value = parseInt(plushbtn.value) + 1;
var UpdateQuaintitynew = plushbtn.dispatchEvent(new Event('change'));
console.log('UpdateQuaintity',UpdateQuaintity);
var dataId = plushbtn.getAttribute("data-index");
console.log('dataId',dataId);
let formdata = {
'id' : dataId,
'quantity' : UpdateQuaintity,
'sections' : ["cart-drawer", "cart-icon-bubble"]
};
fetch('/cart/change.js', {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(formdata)
}).then((res) => {
    return res.json();
}).then((res) => {
    console.log('response', res.item_count)
    console.log('true');
         if (res.item_count === 1) {
            document.querySelector('.header__icon.header__icon--cart').insertAdjacentHTML('beforeend', `<div class="cart-count-bubble mukesh"><span aria-hidden="true">${res.item_count}</span><span class="visually-hidden">${res.item_count} items</span></div>`);
          } else {
            document.querySelector('.cart-count-bubble [aria-hidden]').innerText = res.item_count;
          }
        fetch(`/cart?section_id=cart-drawer`)
            .then((response) => response.text())
            .then((responseText) => {
              const html = new DOMParser().parseFromString(responseText, 'text/html');
              const sourceQty = html.querySelector('.drawer__inner').innerHTML;
              const targetElement = document.querySelector('.drawer__inner');
                if (targetElement) {
                  targetElement.innerHTML = sourceQty;
                   let element = document.querySelector('.drawer');
                   element.classList.add('active');
                }
            })
            .catch((e) => {
              console.error(e);
            });
}).catch((error) => {
    console.error('Error: ', error);
}); 
})


// minues quaintity value
document.getElementById('btn_minus')?.addEventListener('click',function(event){
 var minusbtn = this.parentElement.querySelector('.quantity__input_value');
      var count = parseInt(minusbtn.value) - 1;
        count = count < 1 ? 1 : count;
          minusbtn.value = count;
          minusbtn.dispatchEvent(new Event('change'));
          console.log('count',count);
var dataId = minusbtn.getAttribute("data-index");
let formdata = {
'id' : dataId,
'quantity' : count,
'sections' : ["cart-drawer", "cart-icon-bubble"]
};
fetch('/cart/change.js', {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(formdata)
}).then((res) => {
    return res.json();
}).then((res) => {
    console.log('response', res.item_count)
    console.log('true');
         if (res.item_count === 1) {
            document.querySelector('.header__icon.header__icon--cart').insertAdjacentHTML('beforeend', `<div class="cart-count-bubble mukesh"><span aria-hidden="true">${res.item_count}</span><span class="visually-hidden">${res.item_count} items</span></div>`);
          } else {
            document.querySelector('.cart-count-bubble [aria-hidden]').innerText = res.item_count;
          }
        fetch(`/cart?section_id=cart-drawer`)
            .then((response) => response.text())
            .then((responseText) => {
              const html = new DOMParser().parseFromString(responseText, 'text/html');
              const sourceQty = html.querySelector('.drawer__inner').innerHTML;
              const targetElement = document.querySelector('.drawer__inner');
                if (targetElement) {
                  targetElement.innerHTML = sourceQty;
                  //  let element = document.querySelector('.drawer');
                  // element.classList.add('active');
                }
            })
            .catch((e) => {
              console.error(e);
            });
}).catch((error) => {
    console.error('Error: ', error);
}); 
})

// window.addEventListener('load',function(){
// let quintityvalue;
// var plushbtn = document.querySelector('.quantity__input_value');
// var pid = plushbtn.getAttribute("data-index");
// console.log('pid',pid);
// fetch('/cart.json')
//   .then(response => {
//     return response.json(); 
//   })
//   .then(data => {
//     for (let i = 0; i < data.items.length; i++) {
//     cartproductId = data.items[i].id;
//       console.log('cartproductId',cartproductId);
//        if(cartproductId == pid ){
//          quintityvalue = data.items[i].quantity;
//          console.log('true',quintityvalue);
//          plushbtn.setAttribute("value",quintityvalue);        
//       }
//     }  
//   })
//   .catch(error => {
//     console.log('Error fetching cart JSON:', error);
//   });  
// })


// document.getElementById('btn_plus').addEventListener('click', function() {
//   updateQuantity.call(this, 'plus'); // Pass 'this' context to the function
// });

// document.getElementById('btn_minus').addEventListener('click', function() {
//   updateQuantity.call(this, 'minus'); // Pass 'this' context to the function
// });
// Function to handle quantity update
// function updateQuantity(action) {
//   var plushbtn = this.parentElement.querySelector('.quantity__input_value');
  
//   var currentValue = parseInt(plushbtn.value);
  
//   if (action === 'plus') {
//     plushbtn.value = currentValue + 1;
//   } else if (action === 'minus' && currentValue > 1) {
//     plushbtn.value = currentValue - 1;
//   } else {
    // Prevent reducing quantity below 1 or handle other scenarios if needed
  //   return;
  // }
  
  // Trigger change event
//   plushbtn.dispatchEvent(new Event('change'));
  
//   var dataId = plushbtn.getAttribute("data-index");
  
//   let formData = {
//     'id': dataId,
//     'quantity': plushbtn.value,
//     'sections': ["cart-drawer", "cart-icon-bubble"]
//   };

//   fetch('/cart/change.js', {
//     method: "POST",
//     headers: {
//       'Content-Type': "application/json"
//     },
//     body: JSON.stringify(formData)
//   })
//   .then(response => response.json())
//   .then(data => {
//     // Handle the response to update the UI
//     console.log('response', data.item_count);
    
//     if (data.item_count === 1) {
//       document.querySelector('.header__icon.header__icon--cart').insertAdjacentHTML('beforeend', `<div class="cart-count-bubble mukesh"><span aria-hidden="true">${data.item_count}</span><span class="visually-hidden">${data.item_count} items</span></div>`);
//     } else {
//       document.querySelector('.cart-count-bubble [aria-hidden]').innerText = data.item_count;
//     }
    
//     fetch(`/cart?section_id=cart-drawer`)
//       .then(response => response.text())
//       .then(responseText => {
//         const html = new DOMParser().parseFromString(responseText, 'text/html');
//         const sourceQty = html.querySelector('.drawer__inner').innerHTML;
//         const targetElement = document.querySelector('.drawer__inner');
        
//         if (targetElement) {
//           targetElement.innerHTML = sourceQty;
//           let element = document.querySelector('.drawer');
//           element.classList.add('active');
//         }
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   })
//   .catch(error => {
//     console.error('Error updating cart:', error);
//   });
// }

$('document').ready(function() {
$('.variant-button').click(function(){
  $(this).addClass('active').siblings().removeClass('active');
  const mediatt = $(this).attr('vimage');
  const p_image = $(this).parents('.card-wrapper.product-card-wrapper').find('.card__media');
  const imgSrc = p_image.find('img').attr('srcset',mediatt); 
  console.log('mediatt',imgSrc);
  const tgtProductHandle = $(this).attr("product-handle");
  const tgtvid = $(this).attr("data-variant-id");
  var _this = this;
  fetch(
      tgtProductHandle +
      "&view=update-price",
    {
      credentials: "same-origin",
      method: "GET",
    }
  ).then(function (content) {
    console.log(content,"content>>>>>")
    content.text().then(function (html) {
      var conhh = $(_this)
        .parents(".card__content")
        .find(".price__container")
        .html(html);
    });
  });
  
  
})
  
})

window.addEventListener('variant:change', () => {
  var url = new URL(window.location);
  var cstUrl = url.toString();
  console.log('url', cstUrl);
  var _this = this;
   fetch(
      cstUrl +
      "&view=apluse",
    {
      credentials: "same-origin",
      method: "GET",
    }
  ).then(function (content) {
    content.text().then(function (html) {
      console.log('html',html);
      var conhh = $('.mainsection-apluscontent').html(html);
      console.log('conhh',conhh);
    });
  });
});

// set and get item in localstore on click
var events = document.querySelectorAll('.coll-wishlist');
events.forEach((item) => {
  item.addEventListener('click', function(evt) {
    evt.currentTarget.classList.toggle('active');
    const cstmWishlistHead = evt.target.closest('.cstm-wishlist-head');
    var valuehandle = cstmWishlistHead.getAttribute('product__handle');
    console.log('valuehandle', valuehandle);
    var whishlistitem = JSON.parse(localStorage.getItem("whishlistitem")) || [];
    console.log('wishlistItems', whishlistitem);
     if (!whishlistitem.includes(valuehandle)) {
        whishlistitem.push(valuehandle);
        localStorage.setItem('whishlistitem', JSON.stringify(whishlistitem));
    }else{
      whishlistitem = whishlistitem.filter(item => item !== valuehandle);
      localStorage.setItem('whishlistitem', JSON.stringify(whishlistitem));
      }  
  });
});

// append data in wishlist page js
window.addEventListener('load', function () {
    let pageurl = window.location.hostname;
    let url = 'https://';
    let currenturl = url + pageurl;
    let wishlistitem = JSON.parse(localStorage.getItem("whishlistitem")) || [];
    let wishlistContainer = document.getElementById("innerWishlistItem");
    let wishlistList = document.createElement("ul");

    wishlistitem.forEach(function (item) {
        const itemlink = `${currenturl}/products/${item}.json`;
        fetch(itemlink)
            .then(function (response) {
                return response.text(); 
            })
            .then(function (responseText) {
              try {
                    const productData = JSON.parse(responseText);
                    let unorderlistItem = document.createElement("ul");
                    let listItem = document.createElement("li");
                    listItem.innerHTML = `<div class="WishlistStyle"><img src="${productData?.product?.image.src}" width="100" height="100">
                    <p class="test1"> ${productData?.product?.title}</p>
                    <p class="test2"> Rs: ${productData?.product?.variants[0]?.price}</p>
                    <button class="buttonstyle" vid=${productData?.product?.variants[0]?.id}>Add To Cart</button></div>`;
                     
                    wishlistList?.appendChild(listItem);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            })
         wishlistContainer?.appendChild(wishlistList);
    });
});

// whishlist icon active inactive on page load
window.addEventListener('load', function () {
  const itemscoll = document.querySelectorAll('.coll-wishlist');
  itemscoll.forEach(function (item) {
    var elementhandle = item.firstElementChild;
    var currectwishlisthandle = elementhandle.getAttribute('product__handle');
    console.log('currectwishlisthandle', currectwishlisthandle);
    var whishlistitemCollection = JSON.parse(localStorage.getItem("whishlistitem")) || [];
    var isItemInWishlist = whishlistitemCollection.includes(currectwishlisthandle);
    if (isItemInWishlist) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
});

// Apply discount code in cart page

var DiscountEvent = document.querySelector('.DiscountscodesPopup');
DiscountEvent?.addEventListener('click',(event)=>{
var elementTarget = document.querySelector('.pincode-popup-container-discount');
elementTarget.classList.add('showDiscount');
})

var closeBtn = document.querySelector('#Discount_close_btn');
closeBtn?.addEventListener('click',()=>{
var elementTarget = document.querySelector('.pincode-popup-container-discount'); 
elementTarget.classList.remove('showDiscount');
})

// Applycode Discount code cart Js
 var addCoupan = document.querySelectorAll('.ApplyedDiscounrt');
  addCoupan?.forEach((event)=>{
  event.addEventListener('click',(e)=>{
  var coupantest =  e.target.parentElement.querySelector('.coupanCode').innerText;;
  console.log('coupantest',coupantest);
  var url = window.location.hostname;
    const AddDiscountApi = `https://${url}/discount/${coupantest}`;
    // console.log('AddDiscountApi',AddDiscountApi);
    const formdataSection = {
      "section": ["main-cart-footer","main-cart-item","totalamount"]
    }
     fetch(AddDiscountApi,
    {
      credentials: "same-origin",
      method: "GET",   
    }
  ).then(function (responce) {
    responce.text()
    .then(function (responceText) {
    var elementTarget = document.querySelector('.pincode-popup-container-discount'); 
    elementTarget.classList.remove('showDiscount');
     var elementTargetthank = document.querySelector('.discountCodeApplt');
     elementTargetthank.style.display = "block"; 

      fetch(`/cart?section_id=main-cart-items`)
            .then((response) => response.text())
            .then((responseText) => {
              const html = new DOMParser().parseFromString(responseText, 'text/html');
              const cartitem = html.querySelector('.cart__contents').innerHTML;
              console.log('htmlitems',cartitem);
              const targetElement = $('.cart__contents').html(cartitem);
            })
      
      fetch(`/cart?section_id=cart-drawer`)
            .then((response) => response.text())
            .then((responseText) => {
              const html = new DOMParser().parseFromString(responseText, 'text/html');
              const sourceQty = html.querySelector('.drawer__inner').innerHTML;
              const targetElement = document.querySelector('.drawer__inner');
                if (targetElement) {
                  targetElement.innerHTML = sourceQty;
                }
            })

   fetch(`/cart?view=totalamount`,
       {
      credentials: "same-origin",
      method: "GET",
     })
    .then(function (content) {
    content.text().then(function (html) {
      // console.log('html',html);
      var conhh = $('.totals').html(html);
      // console.log('conhh',conhh);
    });
   });


  fetch(`/cart?view=discount`,
       {
      credentials: "same-origin",
      method: "GET",
     })
    .then(function (content) {
    content.text().then(function (html) {
      // console.log('html',html);
      var conhh = $('.discountPriceupdate').html(html);
      // console.log('conhh',conhh);
    });
   });
       
    });
  });
 }) 
})

// popupclose
var closeBtn = document.querySelector('#ApplyDiscount_close_btn');
closeBtn?.addEventListener('click',()=>{
var elementTarget = document.querySelector('.discountCodeApplt'); 
elementTarget.style.display="none";
})




