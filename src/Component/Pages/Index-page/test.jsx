import React, { PureComponent } from 'react';
import { PieChart, Line, Pie, Sector, Cell, Tooltip, Legend, ResponsiveContainer,LineChart,XAxis, YAxis,CartesianGrid } from 'recharts';
import Header from '../../Header/Header';
const IndexPage =()=>{
    const data = [
        { name: 'Group A', value: 700 },
        { name: 'Group B', value: 100 },
      ];
      const COLORS = ['#8B4FE4','#F4365C'];
      const dataSpending = [
        { name: 'Group A', value: 700 },
        { name: 'Group B', value: 100 },
        { name: 'Group C', value: 900 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 500 },
        { name: 'Group F', value: 300 },
      ];
      const transactionHistory=[
          {
              name:'Mua vé số',
              value:-10000,
              group:'Đầu tư',
              date:'20/11/2022'
          },
          {
            name:'Mua vé số',
            value:-10000,
            group:'Đầu tư',
            date:'20/11/2022'
        },
        {
            name:'Mua vé số',
            value:-10000,
            group:'Đầu tư',
            date:'20/11/2022'
        },
        {
            name:'Mua vé số',
            value:-10000,
            group:'Đầu tư',
            date:'20/11/2022'
        },
        {
            name:'Mua vé số',
            value:-10000,
            group:'Đầu tư',
            date:'20/11/2022'
        },
        {
            name:'Mua vé số',
            value:-10000,
            group:'Đầu tư',
            date:'20/11/2022'
        },
        {
            name:'Lãnh lương',
            value:5000000,
            group:'Thu nhập',
            date:'20/11/2022'
        }
      ]
      const transaction=[
          {
              name:'Jan',
              income:5000000,
              expense:3200000
          },
          {
            name:'Feb',
            income:7000000,
            expense:5650000
        },
        {
            name:'Mar',
            income:5000000,
            expense:4330000
        },
        {
            name:'Apr',
            income:5000000,
            expense:3250000
        },
        {
            name:'May',
            income:5000000,
            expense:4220000
        },
        {
            name:'Jun',
            income:5000000,
            expense:2220000
        },
        {
            name:'Jul',
            income:5000000,
            expense:3520000
        },
        {
            name:'Aug',
            income:7000000,
            expense:6620000
        },
        {
            name:'Sep',
            income:5300000,
            expense:3420000
        },
        {
            name:'Oct',
            income:5000000,
            expense:3420000
        },
        {
            name:'Nov',
            income:7000000,
            expense:720000
        },
        {
            name:'Dec',
            income:5000000,
            expense:720000
        }
      ]
    return(
       <div className='w-full'>
           <Header></Header>
           <div className="w-full flex bg-slate-100">
           <div className='w-1/4 my-8 mx-8'>
                <SpendingManager data={data} COLORS={COLORS}></SpendingManager>
                <TransactionHistory transactionHistory={transactionHistory}></TransactionHistory>
           </div>
            <div className='w-1/2 my-8'>
                <Spending dataSpending={dataSpending}></Spending>
                <SpendingChart transaction={transaction}></SpendingChart>
            </div>
            <div className='w-1/4  my-8 mx-8'><ListSpending dataSpending={dataSpending}></ListSpending></div>
        </div>
       </div>
    )
}
const SpendingManager=props=>{
    const {data, COLORS}=props;
    console.log(data);
    console.log(COLORS);
    return(
        <div className="w-full bg-white rounded-2xl p-8">
        <div className='flex items-center justify-between'>
            <div className='flex space-x-4 items-center'>
                <span className='w-12 h-4 bg-purple'></span>
                <p className='text-sm text-slate-500'>Thu nhập</p>
            </div>
            <div className='flex space-x-4 items-center'>
                <span className='w-12 h-4 bg-pink'></span>
                <p className='text-sm text-slate-500'>Chi tiêu</p>
            </div>
        </div>
        <PieChart width={300} height={200}>
                <Pie
                data={data}
                cx={130}
                cy={100}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={1}
                dataKey="value"
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
        </PieChart>
        <p className='text-slate-500 text-center'>Số dư khả dụng</p>
        <h3 className='text-center font-bold text-2xl'>600.000vnđ</h3>
        <div className='flex my-5 justify-between'>
            <button className='px-5 py-0.5 bg-purple rounded-xl text-center'><i className="fa-solid fa-circle-plus text-xs text-white mr-1"></i><span className='text-xs text-white'>Thu nhập</span><p className='text-xs text-white mb-1'>3.600.000vnđ</p></button>
            <button className='px-5 py-0.5 bg-pink rounded-xl text-center'><i className="fa-solid fa-circle-minus text-xs text-white mr-1"></i><span className='text-xs text-white'>Chi tiêu</span><p className='text-xs text-white mb-1'>2.400.000vnđ</p></button>
        </div>
    </div>
    )
}
const Spending=props=>{
    const {dataSpending}=props;
    const COLORS =['#4197E6','#E3B456','#EE5387','#8D4DE9','#7BD220','#43D598']
   return(
    <div className='w-full bg-white rounded-2xl p-8 '>
        <div className='flex justify-between'>
            <p className='text-slate-600 font-bold'>CƠ CẤU CÁC HỦ</p>
            <button className='bg-purple px-5 py-1 rounded text-white text-sm'>Chỉnh sửa</button>
        </div>
        <div className='flex mt-10 space-x-10'>
            <div className='w-1/2 mt-5'>
                <p className='text-center text-slate-600 font-bold'>Tổng 100%</p>
                <PieChart width={400} height={300}>
                    <Pie
                    data={dataSpending}
                    cx={130}
                    cy={130}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={1}
                    label='1'
                    dataKey="value"
                    >
                    {dataSpending.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                </PieChart>
            </div>
            <div className='w-full'>
                {
                    dataSpending.map((item,index)=>(
                        <div className='flex my-5 justify-between'>
                            <h6>{item.name}</h6>
                            <input type="text" className='w-16 p-1 shadow-md shadow-slate-300 text-left' value={item.value} />
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
   )
}
const ListSpending=props=>{
    const {dataSpending}=props;
    return(
        <div className='w-full rounded-xl bg-white p-8'>
            <p className='text-slate-600 font-bold mb-10'>DANH SÁCH HŨ</p>
            {
                dataSpending.map((item,index)=>(
                    <div className='my-5'>
                        <div className='flex justify-between'>
                            <p className='py-0.5 px-3 text-center rounded-xl bg-slate-100 text-xs'>{item.name}</p>
                            <p className='text-xs text-slate-500'>435.000đ</p>
                        </div>
                        <input type="range" step='1' min='0' className='my-2 w-full h-1' value='18' />
                    </div>
                ))
            }
        </div>
    )
}
const TransactionHistory=props=>{
    const {transactionHistory}=props;
    return(
        <div className='w-full rounded-xl bg-white p-5 my-5' >
            <h2 className='text-slate-700 font-bold mt-3 mb-5'>GIAO DỊCH MỚI NHẤT</h2>
            <div>
                {
                    transactionHistory.map((item,index)=>(
                        <div className='my-3 flex justify-between'>
                            <div className='flex items-center'>
                                <div className='w-8 h-8 flex items-center justify-center bg-slate-200 rounded-lg text-sm mr-3'>
                                    <i className="fa-solid fa-burger"></i>
                                </div>
                                <div>
                                    <p className='font-bold text-slate-600 text'>{item.group}</p>
                                    <p className='text-sm text-slate-500'>{item.name}</p>
                                </div>
                            </div>
                            <div>
                                <p className={`text-sm ${item.value>0?'text-purple':'text-rose-500'} font-bold`}>{item.value}đ</p>
                                <p className='text-sm text-slate-500'>{item.date}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
const SpendingChart=props=>{
    const {transaction}=props;
    return(
        <div className='p-5 bg-white rounded-xl my-5'>
            <p className='font-bold text-slate-700'>BÁO CÁO THU CHI</p>
            <p className='text-center text-slate-500 my-5'>Báo cáo thu chi (Vnđ)</p>
            <LineChart
                width={600}
                height={315}
                data={transaction}
                margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#8B4FE4" />
                <Line type="monotone" dataKey="expense" stroke="#F43F5E" />
            </LineChart>
        </div>
    )
}
export default IndexPage;