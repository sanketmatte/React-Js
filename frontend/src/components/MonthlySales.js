
  import React from 'react';
  import { BarChart,XAxis, YAxis, Tooltip, Bar } from 'recharts';
  import { useState, useEffect } from 'react';
  import axios from 'axios';

  export default function MonthlySales() {
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    var total_sales = 0
    useEffect(() => {
      axios.get('http://localhost:8008/bill/')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  
    const transformedData = data
      .filter(bill => {
        console.log("bill date",(bill.bill_date).substr(0,4))
        return (bill.bill_date).substr(0,4) === selectedYear
      })
      .reduce((result, bill) => {
        console.log("month",(bill.bill_date).substr(5,2))

        const month = (bill.bill_date).substr(5,2);
        
        if (!result[month]) {
          result[month] = 0;
        }
        result[month] += parseFloat(bill.amount);
        total_sales += parseFloat(bill.amount);
        console.log(result)
        return result;
      }, {});
  
    const chartData = Object.keys(transformedData).map(month => ({
      name: month,
      amount: transformedData[month]
    }));
    // console.log(chartData)
    const formatTick = (tick) => {
      const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      return monthNames[tick - 1];
    };
    
    const handleYearChange = (event) => {
      setSelectedYear(event.target.value);
      console.log(selectedYear)

    };
    
    
      return (
        <>
        <div className="cust-header">
          <span  className="header-name">Monthly Sales </span>
        </div>
        <div style={{marginTop:"20px"}}>
        <label >TOTAL SELL : {total_sales}</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label  style={{ marginBottom : "0", width:"60px" }} htmlFor="year-input">Year:</label>
          <input type="text" style={{ marginTop:"0" ,width:"60px"}} id="year-input" value={selectedYear} onChange={handleYearChange} />
        </div>
        </div>
        <hr></hr>
        <div style={{display:'flex', justifyContent:"space-around", marginTop:'40px'}  }>          
          <BarChart width={600} height={300} data={chartData}>
          <XAxis dataKey="name" tickFormatter={formatTick}  />
                <YAxis/>
                <Tooltip />
            <Bar dataKey="amount" fill="#4F8EF7" />
          </BarChart>
          </div>

        </>
      );
    
  }
  