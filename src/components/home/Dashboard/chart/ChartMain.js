
import './chartM.css'
import React from "react";
import {  useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer } from "recharts";
// import { allProjects } from '../../../../redux/slice/ProjectSlice';




const ChartMain = () => {
  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(allProjects());
  // },[dispatch]);

  const {data} = useSelector((val)=>val.proData);

  const hr = data.filter((val)=> val.department === 'Hr').length;
  const hrclosed = data.filter((val) => val.department === 'Hr' && val.status === 'Close').length;

  const str = data.filter((val)=> val.department === 'Strategy').length;
  const strclosed = data.filter((val)=>val.department === 'Strategy' && val.status === 'Close').length

  const man = data.filter((val)=>val.department === 'Maintenance').length;
  const manclosed = data.filter((val)=>val.department === 'Maintenance' && val.status === 'Close').length;

  const qlt = data.filter((val)=>val.department === 'Quality').length;
  const qltclosed = data.filter((val)=>val.department === 'Quality' && val.status === 'Close').length;

  const fin = data.filter((val)=> val.department === 'Finance').length;
  const finclosed = data.filter((val)=>val.department === 'Finance' && val.status === 'Close').length;

  const sto = data.filter((val)=>val.department === 'Storage').length;
  const stoclosed = data.filter((val)=> val.department === 'Storage' && val.status === 'Close').length;

  const dataChart = [
    { name: "STR", total: str, closed: strclosed },
    { name: "Man", total: man, closed: manclosed},
    { name: "QLT", total: qlt, closed: qltclosed },
    { name: "FIN", total: fin, closed: finclosed },
    { name: "STO", total: sto, closed: stoclosed },
    { name: "HR", total: hr, closed: hrclosed },
  ];
  
  const calculatePercentage = (closed, total) =>
    ((closed / total) * 100).toFixed(0);
  
  const dataWithPercentage = dataChart.map((item) => ({
    ...item,
    percentage: calculatePercentage(item.closed, item.total),
    xLabel: `${item.name} ${calculatePercentage(item.closed, item.total)}%`
  }));
  
  const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    const [name, percentage] = payload.value.split(' ');
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16}  fontSize="15" textAnchor="middle">
          <tspan x="0" dy="1.3em" fontWeight="bold">{percentage}</tspan>
          <tspan x="0" dy="1.7em">{name}</tspan>
        </text>
      </g>
    );
  };



  return (
    <div className="chartCom">
      <div className="chartWrapper">
        <ResponsiveContainer width="100%" height={300} style={{zIndex:0}}>
          <BarChart 
            data={dataWithPercentage} 
            barSize={15} 
            margin={{top:15,left:-5}}
          >
            <XAxis 
              dataKey="xLabel" 
              height={80}
              interval={0}
              tick={<CustomXAxisTick />}
            />
            <YAxis />
            <Bar dataKey="total" fill="#025aab" style={{width:'10px'}} radius={[10, 10, 10, 10]}>
              <LabelList position="top" />
            </Bar>
            <Bar dataKey="closed" fill="#5aa647" radius={[10, 10, 10, 10]}>
              <LabelList position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        <div className="chartLegend">
          <div className="blci">
            <div className="blueCir"></div>
            <div>Total</div>
          </div>
          <div className="grci">
            <div className="greenCir"></div>
            <div>Closed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartMain;



