"use client"
import { useState, useEffect,useRef } from 'react';
import Button6 from './button/button';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,LinearScale, BarElement } from 'chart.js';
import { Doughnut , Bar } from 'react-chartjs-2';
import Loading from './loading/loading';
import Image from 'next/image';

ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,BarElement);








export default function Home() {

  const chartRef = useRef(null);
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [usercookie, setusercookie] = useState('!');

  useEffect(() => {
    // Check if running on the client side before accessing the document
    if (typeof document !== 'undefined') {
      setusercookie(document.cookie);
    }
  }, []); // Empty dependency array to run the effect only once on mount

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleUsernameFetch = async () => {
    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
      const data = await response.json();

      // Assuming the API response structure includes a 'result' key with user information
      const userInformation = data.result[0];

      // Set the fetched user data in state
      setUserData(userInformation);

      // Store the username in a cookie
      if (typeof document !== 'undefined') {
        document.cookie = `${username}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;
        setusercookie(document.cookie);
        window.location.reload();
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const [acceptedData, setAcceptedData] = useState([]);
  const [profile,setprofile]=useState([]);
  const url = `https://codeforces.com/api/user.status?handle=${usercookie}`;

  useEffect(() => {

    if(usercookie!=='!')
    {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
        
          // Filter submissions with 'accepted' verdict
          const acceptedSubmissions = data.result.filter(submission => submission.verdict === 'OK');

          // Update the state with the accepted data
          setAcceptedData(acceptedSubmissions);
        } else {
          console.error(`Failed to fetch data. Status code: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
     




    };
        const handleUserdataFetch = async () => {
        try {
          const response = await fetch(`https://codeforces.com/api/user.info?handles=${usercookie}`);
          const data = await response.json();
    
          // Assuming the API response structure includes a 'result' key with user information
          const userInformation = data.result[0];
    
          // Set the fetched user data in state
          setprofile(userInformation);
    
          // Store the username in a cookie
         
    
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    fetchData();
  handleUserdataFetch();}
  }, [url]);  





const problemTags = [  
'combine-tags-by-OR',
'2-sat',
'binary search',
'bitmasks',
'brute force',
'chinese remainder theorem',
'combinatorics',
'constructive algorithms',
'data structures',
'dfs and similar',
'divide and conquer',
'dp',
'dsu',
'expression parsing',
'fft',
'flows',
'games',
'geometry',
'graph matchings',
'graphs',
'greedy',
'hashing',
'implementation',
'interactive',
'math',
'matrices',
'meet-in-the-middle',
'number theory',
'probabilities',
'schedules',
'shortest paths',
'sortings',
'string suffix structures' ,
'strings',
'ternary search',
'trees',
'two pointers',];



const tagToCount = {};
const ratingToCount={};
const uniqueProblems = new Set();





acceptedData.forEach(user => {
  const problemKey = `${user.problem.contestId}-${user.problem.index}`;

  // Check for duplicate problem
  if (uniqueProblems.has(problemKey)) {
    // Handle duplicate problem (e.g., skip, log, etc.)
    
    return;
  }

  uniqueProblems.add(problemKey);

 


 if( ratingToCount[user.problem.rating] && user.problem.rating!==undefined)  
 ratingToCount[user.problem.rating]++;
 else if(user.problem.rating!==undefined)
 ratingToCount[user.problem.rating]=1;


  user.problem.tags.forEach(tag => {
    if (problemTags.includes(tag)) {
      if (tagToCount[tag]) {
        tagToCount[tag]++;
      } else {
        tagToCount[tag] = 1;
      }
    }
  });
});







const tagColors = [
  '#FFB6C1', // LightPink
  '#98FB98', // PaleGreen
  '#87CEFA', // LightSkyBlue
  '#FFD700', // Gold
  '#FFC0CB', // Pink
  '#00CED1', // DarkTurquoise
  '#F0E68C', // Khaki
  '#FF6347', // Tomato
  '#ADFF2F', // GreenYellow
  '#F08080', // LightCoral
  '#00FF7F', // SpringGreen
  '#87CEEB', // SkyBlue
  '#FFA07A', // LightSalmon
  '#20B2AA', // LightSeaGreen
  '#FFDAB9', // PeachPuff
  '#00FA9A', // MediumSpringGreen
  '#E6E6FA', // Lavender
  '#FF4500', // OrangeRed
  '#7B68EE', // MediumSlateBlue
  '#FFA500', // Orange
  '#98FB98', // PaleGreen
  '#87CEEB', // SkyBlue
  '#FF69B4', // HotPink
  '#32CD32', // LimeGreen
  '#F5DEB3', // Wheat
  '#FF6347', // Tomato
  '#F0E68C', // Khaki
  '#DDA0DD', // Plum
  '#B0E0E6', // PowderBlue
  '#00CED1', // DarkTurquoise
  '#FF7F50', // Coral
  '#87CEFA', // LightSkyBlue
  '#FFD700', // Gold
  '#32CD32', // LimeGreen
  '#F08080', // LightCoral
  '#00FF7F', // SpringGreen
  '#B0C4DE', // LightSteelBlue
  '#40E0D0', // Turquoise
  '#9370DB', // MediumPurple
  '#FF8C00', // DarkOrange
  '#556B2F'  // DarkOliveGreen
];

const data = [
  ["Tag", "Count"],
  ...Object.entries(tagToCount).map(([tag, count]) => [tag, count]),
];

const datacolor = [
  ["Tag", "Count"],
  ...Object.entries(tagToCount).map(([tag, count], index) => [tag, count, tagColors[index % tagColors.length]]),
];

datacolor.sort((a, b) => b[1] - a[1]);

// If you want to keep the header at the beginning, you can separate it
const [header, ...sortedData] = datacolor;

// Updated sortedData array
const sortedDatacolor = [header, ...sortedData];
const offset = new Array(sortedDatacolor.length-1).fill(0);



const dataForChart = {
  labels: Object.keys(tagToCount),
  datasets: [
    {
      
      data: Object.values(tagToCount),
      backgroundColor: 
        
           tagColors

      ,
      borderColor: [
        'gray'
         
      ],
      borderWidth: 1,
      offset:offset
     
    },
  ],
  
};

const dataForbarChart = {
  labels: Object.keys(ratingToCount),
  datasets: [
    {
      
      data: Object.values(ratingToCount),
      backgroundColor: 
        
           tagColors

      ,
      borderColor: [
        'gray'
         
      ],
      borderWidth: 1,
      
     
    },
  ],
  
};

const graph = (index) => {

  
  const clickedTag = sortedData[index - 1][0];
  const dataPosition = data.findIndex((item) => item[0] === clickedTag);
  const chart = chartRef.current;

  chart.tooltip.setActiveElements([{datasetIndex: 0, index: dataPosition-1}]);
  chart.setActiveElements([{datasetIndex: 0, index: dataPosition-1}]);
  offset[dataPosition-1]=20;
 
  chart.update();

  offset[dataPosition-1]=0;
   
};


const offsetclick=(e)=>
{

  const chart = chartRef.current;
  
  const points = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);

    if (points.length) {
        const firstPoint = points[0];

  
          chart.data.datasets[firstPoint.datasetIndex].offset[firstPoint.index]=20;
         
         chart.update();
         chart.data.datasets[firstPoint.datasetIndex].offset[firstPoint.index]=0;
    }
   
   /*chart.config.data.datasets[x[x.length-1].index].offset[x[0].index]=40;
   chart.update();*/
  

 
 
}
console.log(profile)

const ratingColor = (val) => {
  if (val >= 0 && val <= 1200) {
  
    return `gray`;
  }

  if (val > 1200 && val <= 1400) {
   
    return `green`;
  }
  if (val > 1400 && val <= 1600) {
  
    return `#03a89e`;
  }
  if (val > 1600 && val <= 1900) {
   
    return `blue`;
  }
  if (val > 1900 && val <= 2100) {

    return `#a0a`;
  }
  if (val > 2100 && val <= 2300) {
   
    return `#ff8c00`;
  }
  if (val > 2300 && val <= 2400) {
   
    return `#ff8c00`;
  }
  if (val > 2400 && val <= 2600) {
   
    return `red`;
  }
  if (val > 2600 && val <= 3000) {
   
    return `red`;
  }
  if (val > 3000) {
   
    return `red`;
  }



  
};

  return usercookie==='!'?<Loading></Loading>:usercookie === '' ? (
    <div className="w-full flex flex-col items-center gap-2 justify-center my-20">
      <div className="w-72">
        <div className="relative w-full min-w-[200px] h-10 border-black">
          <input
            className="peer w-full h-full bg-transparent text-gray-500 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown: border-t placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
            placeholder=" "
            value={username}
            onChange={handleInputChange}
          />
          <label
            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:flex-grow before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
            Username
          </label>
        </div>
      </div>
      <div onClick={handleUsernameFetch}>
        <Button6 text={'START'} />
      </div>
    </div>
  ) : (

      <div className='flex flex-col gap-40'>
                <div>
          {profile.length===0?<Loading></Loading>:
           <div className='flex flex-col  justify-center items-center'>
    <div className='flex justify-center my-10 '></div>
            <div className="chart-container flex flex-row border border-solid border-gray-300 rounded "
    style={{ height: '100vh', width: '93vw'}}>
<div className='flex' style={{width:'100%'}}>
<div style={{width:'100%'}}>
  <div className='pl-5 pt-3' >
    <div className='flex flex-col gap-2'><div><h2 className=' text-sm sm:text-2xl md:text-3xl lg:text-4xl' style={{color:ratingColor(profile.rating),fontWeight:'bolder' }}>{profile.rank}</h2></div>
    <div><h2 className={`${profile.rating>3000?'ratingcol':null} text-sm sm:text-sm md:text-xl lg:text-2xl`} style={{color:ratingColor(profile.rating),fontWeight:'bold'}}>{profile.handle}</h2></div>
    <div className='flex gap-2 pt-3 contest-div'><Image src='./contest.svg' width={25} height={25}/>
      <h2 className='contest-rating' style={{fontSize:'1.3rem'}}>Contest rating :</h2><h2 className= 'contest-rating' style={{fontWeight:'bold',color:ratingColor(profile.rating),fontSize:'1.3rem'}}>{profile.rating}</h2>
    <h2 className='contestp-div text-sm flex gap-2'>(max <p className='contestp' style={{color:ratingColor(profile.maxRating),fontWeight:'bold'}}>{profile.maxRank}</p><p className='contestp' style={{color:ratingColor(profile.maxRating),fontWeight:'bold'}}>{profile.maxRating}</p> )
    </h2></div>
    </div>
  </div>
</div>

<div style={{width:'100%'}} ><div className='mr-3 mt-3  flex justify-end'>
  <div className='border border-solid border-gray-300 rounded p-3'>
  <img className="rounded temp"  src={profile.titlePhoto} alt="Extra large avatar" style={{ width:'272px', height:'300px' }} />
  </div>
 
</div></div>  



</div>
    


            </div>
            </div>
}
            </div>
        <div>
          { sortedDatacolor.length===1?<Loading></Loading>:
           <div className='flex flex-col pt-16 justify-center items-center'>
     <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-5xl dark:text-black" style={{'textAlign':'center'}}>Solved Problem <span className="text-blue-600 dark:text-blue-500">Rating</span></h1>
    <div className='flex justify-center my-10 '></div>
            <div className="chart-container flex flex-row  justify-center items-center  border border-solid border-gray-300 rounded "
    style={{ position: 'relative', height: '75vh', width: '93vw'}}>
            <Bar  options={{
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
   
  }}  data={dataForbarChart}   />
            </div>
            </div>
}
            </div>
      <div>

      { 
      sortedDatacolor.length===1?<Loading></Loading>:    
    <div className='flex flex-col pt-16'>
     <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-5xl dark:text-black" style={{'textAlign':'center'}}>Tag <span className="text-blue-600 dark:text-blue-500">Solved</span></h1>
    <div className='tagdad flex justify-center my-10 gap-10'>

<div
    className="chart-container flex flex-row gap-x-20 justify-center items-center  border border-solid border-gray-300 rounded "
    style={{ position: 'relative', height: '60vh', width: '50vw',padding:'20px' }}
  >
 
  <Doughnut
  data={dataForChart}
  options={{
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    onClick: (e) => offsetclick(e),
  }}
  ref={chartRef}
/>



    
  </div>
  <div className={`tags flex flex-col  justify-center items-center border border-solid border-gray-300 rounded `} style={{ height: '60vh',width:'40vw', overflowY: 'auto' }}>
    <div className=' mb-20 flex flex-col gap-3' style={{'height':'75%'}}>
      {sortedDatacolor.map(([tag, count, color], index) => (
        <div key={index} className='flex flex-row justify-start pl-10  gap-2 w-full'>
        {index>0 &&
        <div className='tagkami flex gap-4'>
          <div className='tagbox' style={{
            width: '30px',
            height: '30px',
            borderRadius: '8px', 
            backgroundColor: color,
            borderColor:'black',
            borderWidth:'1px'
          }}  onClick={() => graph(index)}></div>
          <div className='tagename mt-2' style={{ fontSize: '14px', fontWeight: 'bold'  }}>
            {tag} : {count}
          </div>
          </div>}
        </div>
      ))}
    </div>
    </div>
    </div>
    </div>}
    </div>
      </div>    
  );
}
