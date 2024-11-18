import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [freq, setfreq] = useState(undefined);
  const [yaxis, setyaxis] = useState([]);

  const fetchNumbers =async () => {
    const url = "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
    const res = await fetch(url);
    let data = await res.text();
    // split method ko use karne se ab data string format main dekhengi or saperated hogi by indexing.
    data = data.split("\n").filter(Boolean);
    
    // map bana hai
    const map = {};
    data?.forEach(item => {
      if (map[item]) {
        // map ke item ko +1 karna hai
        map[item]++;
      }
      else {
        // map ko value == 1 assign karni hai
        map[item] = 1;
      }
    });

    setfreq(map);
    
    // data ko set karne ke liye ek usestate ka maintain hoga
  }
  console.log(freq);

  // or ek useEffect ko bana hai taki freq main data ko maintain kar sake
  // preparing y-axis data
  // [40,30,20,10,0] ye y-axis ka value dynamic hoga x-axis ka data ka maximum value ke upar y-axis ka maxiumm value depenend karega


  useEffect(() => {
    if (freq) {
      // max value ko obtain karna hai freq main jitne bhi values hai
      const max = Math.max(...Object.values(freq));
      // max value ko ceil karna hai taki roundoff number milye
      const maxval = Math.ceil(max / 10) * 10;
      // ab maxval ko use karke ek array banana hai usmain x-axis ke values honge
      const arr = [];
      for (let i = (maxval / 10); i >= 0; i--) {
        // 3,2,1,0
        // ab "i" value ko arr main push karna hai by multiplying with 10
        arr.push(i * 10); //30,20,10,0
        // ab is array ko maintain karne ke liye ek state variable banayenge yaxis nam ka
      }
      setyaxis(arr);
    }
  }, [freq]);
  console.log('yaxis', yaxis);
  
  
 
  useEffect(() => {
    
    fetchNumbers();
  }, [])
  

  return (
    <div className="App">
      <div className='container'>
        <div className='box'>
          <div className='box-yaxis' style={{height :`${yaxis && yaxis[0]}`}}>
            {/* style laga ke yaxis ke data ko set karenge */}
            {
              yaxis?.map((val, idx) => (<div key={idx}>
                <span>{val}</span>
              </div>))
            }
          </div>
          {
            freq && Object.entries(freq)
              ?.map(([key, val]) => (
                <div className='box-xaxis'>
                  <div className='graph' style={{height : `${val}%`}}></div>
                  <div className='index'>{key}</div>
                </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
