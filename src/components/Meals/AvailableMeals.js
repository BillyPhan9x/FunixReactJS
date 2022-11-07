import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import styles from "./AvailableMeals.module.css";

// Component AvailableMeals.js để hiển thị ra danh sách các món ăn có thể oder
const AvailableMeals = () => {
  // Use useState() Hook quản lý trạng thái
  // trạng thái dữ liệu, trạng thái tải và trạng thái lỗi
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tìm nạp dữ liệu ngay lập tức vs useEffect()
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-pvt-http-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      // Phương thức .json() tự động chuyển dữ liệu định dạng JSON => đối tượng JS
      const responseData = await response.json();
      console.log("fetchMeals - responseData", responseData);

      // Biến đổi lại dữ liệu nhận về từ API
      const loadedMeals = [];
      // vòng lặp for in để lặp qua tất cả các khóa trong dữ liệu.
      for (const key in responseData) {
        // Đưa(push) vào mảng loadedMovies 1 đối tượng mới cho mọi cặp key-value nhận dc dữ liệu phản hồi.
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      // cập nhật lại giá trị cho state
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    // hàm vẫn dc thực thi và vẫn có thể use async/await, nhưng chức năng use tổng thể 0 trả lại 1 lời hứa.
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  // Giả sử theo mặc định, biến content sẽ lưu giá trị là 1 đoạn văn bản.
  let content = <p>Found no meals.</p>;
  // Thiết lập giá trị biến thành các content # tùy thuộc vào trạng thái mà UD đang tồn tại.
  if (meals.length > 0) {
    // trạng thái có dữ liệu
    content = <ul>{mealsList}</ul>;
  }
  if (error) {
    // trạng thái có lỗi
    content = <p className={styles.error}>{error}</p>;
  }
  if (isLoading) {
    // trạng thái đang tải dữ liệu
    content = <p>Loading...</p>;
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
