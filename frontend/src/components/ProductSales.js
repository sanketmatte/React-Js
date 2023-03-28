import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie,Cell, Legend, Tooltip } from "recharts";

function ProductSales() {
  const [data, setData] = useState([]);
  const [totalProducts, setTotalProducts] = useState();

  useEffect(() => {
    axios
      .get("/bill-item/")
      .then((response) => {
        // Group products by name and sum the quantities
        const groupedData = response.data.reduce((acc, curr) => {
          const existingProduct = acc.find((p) => p.name === curr.item_name);
          if (existingProduct) {
            existingProduct.value += curr.quantity;
          } else {
            acc.push({ name: curr.item_name, value: curr.quantity });
          }
          setTotalProducts(acc.length);
          return acc;
        }, []);

        // Sort the products by value in descending order and slice the array to include only the top 5 products
        const sortedData = groupedData.sort((a, b) => b.value - a.value).slice(0, 5);
        setData(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Define an array of colors to use for each pie
  // const colors = [
  //   // '#89CFF0',
  //   // '#B0E0E6',
  //   // '#87CEEB',
  //   // '#6495ED',
  //   '#ADD8E6',
  //   '#1E90FF',
  //   '#4682B4',
  //   '#6A5ACD',
  //   '#000080',];
  const colors = [
    // '#D3D3D3',
    // '#A9A9A9',
    '#6495ED',

    '#87CEFA',
    // '#90EE90',
    // '#FFFFE0',
    // '#FF7F50',
    // '#FA8072',
    // '#E6E6FA',
    // '#FF007F',
    '#4682B4',
    '#1E90FF',
    '#87CEEB',
    // '#89CFF0',
    '#ADD8E6',
    // '#0000CD',
    // '#00BFFF',
    // '#00CED1',
    ]

  return (
    <div>
      {/* <div style={{ marginTop: "2%", marginLeft: "2%" }}>
        <h3>
          <b>Products Sale</b>
        </h3>
        <h5>Products : {totalProducts}</h5>
        <h5>Year: 2023</h5>
      </div>
      <div>
        <hr
          style={{
            background: "grey",
            color: "black",

            height: "3px",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-40%,-30%)",
        }}
      > */}
       <div className="cust-header">
          <span  className="header-name">Monthly Sales </span>
        </div>
        <div style={{marginTop:"20px"}}>
        <label >TOTAL PRODUCTS :{totalProducts}</label>
        <label >Year: 2023</label>
        
        </div>
        <hr></hr>
      <div style={{display:'flex', justifyContent:"space-around", marginTop:'40px'}  }>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            data={data}
            nameKey="name"
            outerRadius={140}
            label={({ name, percent }) => `${name},${(percent * 100).toFixed(0)}%`}>
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
            </Pie>
          
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      </div>
  );
}

export default ProductSales;
