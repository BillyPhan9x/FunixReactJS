import React, { useState } from "react";

// Tạo biến const ProductsContext 'chữ P & C viết hoa vì sẽ use làm 1 component . Quản lý {} có attribute products chứa 1 mảng các products (all value context chỉ là 1 mảng). Case có các trường # thì phải thêm 1 {}
export const ProductsContext = React.createContext({
  products: [],
  toggleFav: (id) => {}, // // add hàm vào initial, nhận id làm tham số để IDE hỗ trợ tốt hơn, biết cần truyền id vào hàm khi gọi
});
// => Đã tạo xong {} context

// Cần xuất default 1 component, nhận 1 props và return some code JSX. (xuất 1 component hàm như bình thường)
// Cung cấp context cho all những gì được truyền vào trong vs props.children
export default (props) => {
  // Do value changed nên use hook useState() từ react để quản lý state
  const [productsList, setProductsList] = useState([
    {
      id: "p1",
      title: "Red Scarf",
      description: "A pretty red scarf.",
      isFavorite: false,
    },
    {
      id: "p2",
      title: "Blue T-Shirt",
      description: "A pretty blue t-shirt.",
      isFavorite: false,
    },
    {
      id: "p3",
      title: "Green Trousers",
      description: "A pair of lightly green trousers.",
      isFavorite: false,
    },
    {
      id: "p4",
      title: "Orange Hat",
      description: "Street style! An orange hat.",
      isFavorite: false,
    },
  ]);

  // Tạo hàm arrow function nhận tham số productId (ý tưởng là chuyển đổi giữa status favoris và 0 favorite of a product)
  const toggleFavorite = (productId) => {
    // Gọi setProductsList nhận currentProductList, trả về a list new (dựa trên list old).
    setProductsList((currentProdList) => {
      const prodIndex = currentProdList.findIndex((p) => p.id === productId);
      console.log("prodIndex", prodIndex);
      const newFavStatus = !currentProdList[prodIndex].isFavorite;
      console.log("newFavStatus", newFavStatus);
      const updatedProducts = [...currentProdList];
      updatedProducts[prodIndex] = {
        ...currentProdList[prodIndex],
        isFavorite: newFavStatus,
      };
      console.log("updatedProducts", updatedProducts);
      // Trả về updatedProducts dựa trên list cũ và use nó = cách copy all attributes của items cũ in list và replace = newFavStatus.
      return updatedProducts;
    });
  };

  return (
    <ProductsContext.Provider
      value={{ products: productsList, toggleFav: toggleFavorite }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

// 📌 Thường hook này chỉ use dc vs components function, nhưng xét về mặt lý thuyết thì cũng CAN use dc vs components dựa trên lớp.

// Syntax hàm đảm bảo nhận được trạng thái mới nhất (quản lý trạng thái vs trạng thái trước đó)

// custom thêm cho context và use context cho thành phần Products
// - Thêm togleFav vào {} dc truyền vào làm value cho ProductsContext.Provider
// ==> Ở eveywhere có use context, You Can call hàm này và hàm này sẽ change 1 thứ gì đó trong file, change status, từ đó trả về 1 status mới, 1 value mới cho components đang nghe context.

//📌  Tổng kết về Context API (tại sao 0 dùng Context API thay cho Redux được?)
//- React Context phù hợp vs những UD có số lần cập nhật hay Change thấp. Context 0 hữu hiệu lắm khi dữ liệu cần Change liên tục
// - Giả sử trạng thái xác thực user,chủ đề, moduls phản ứng hooks

// Hoạt động của Context API
// - anywhen có điều gì đó changed tronng ngữ cảnh, nó 0 có cách nào tìm ra thành phần nào use ngữ cảnh này 1 cách thông minh.
// - API ngữ cảnh chỉ simple là 0 dc tối ưu hoá và 0 có công cụ quản lý trạng thái toàn cầu trong UD

//📌 Trạng thái Favorites 0 nên quản lý bởi Context API do có tần suất Change cao
