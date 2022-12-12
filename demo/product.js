
var listProduct = [
  {
    id: 1,
    name: "aos 1",
    price: "500",
    image: "image/sanpham1.jpg",
  },
  {
    id: 2,
    name: "aos 2",
    price: "600",
    image: "image/sanpham2.jpg",
  },
  {
    id: 3,
    name: "aos 3",
    price: "700",
    image: "image/sanpham3.jpg",
  },
  {
    id: 4,
    name: "aos 4",
    price: "800",
    image: "image/sanpham4.jpg",
  },
];
localStorage.setItem("listProduct", JSON.stringify(listProduct));
function renderProduct() {
  let data = "";
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  for (let i = 0; i < listProduct.length; i++) {
    data += `
     <div class ="product">
        <img src="${listProduct[i].image}" alt="" width = 200px;>
        <p> ${listProduct[i].name} </p>
        <label for="price"> ${listProduct[i].price}</label>

        <div>
          <input type="number" value="1">
          <i onclick="addToCart(${listProduct[i].id})" class="fa-solid fa-cart-shopping"> </i>
        </div>
    </div>
    `;
  }
  document.getElementById("showProduct").innerHTML = data;
}
renderProduct();

function addToCart(id) {
  console.log("id", id);
  let listProducts = JSON.parse(localStorage.getItem("listProduct"));
  console.log("listProduct", listProducts);
  console.log("id",id);
  // lấy list p+roduct khi add vào giỏ hàng

  // key listProductCart là giỏ hàng của mình 
  let listProductCart= localStorage.getItem("listProductCart")
  if (listProductCart == null) {
    // th chưa mua hàng
    listProductCart = [];

    // lấy thông tin sản phẩm mà khách hàng mua
    for (let i = 0; i < listProducts.length; i++) {
      // để biết kick vào sản phẩm nào
      if (listProducts[i].id == id) {
        listProductCart.push(listProducts[i]);
        localStorage.setItem(
          // chuyển sang dạng Json
          "listProductCart",
          JSON.stringify(listProductCart)
        );
        break;
      }
    }
  } else {
    // trường hợp đã có sản phẩm rồi add thêm sp
    /*   1. sp đã tồn tại trong giỏ hàng
    
         2. sp chưa tồn tại trong giỏ hàng   
    */
    let listProductAddCart = JSON.parse(listProductCart);
    for (let i = 0; i < listProducts.length; i++) {
      let flag = false;
      if (listProducts[i].id == id) {
        for (let j = 0; j < listProductAddCart.length; j++) {
          if(listProductAddCart[j].id==id){
            flag = true;
            break;
          }
          else{
            flag = false;
          }

          
        }
        if(flag==true){
          console.log("sp đã có trong giỏ hàng");
        }
        else{
          listProductAddCart.push(listProducts[i]);
          localStorage.setItem("listProductCart",
            JSON.stringify(listProductAddCart));
          }
      }
    }
  }
}



