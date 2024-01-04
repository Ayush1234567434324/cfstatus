"use client"
import { useState, useEffect } from 'react';
import Button6 from './button/button';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);








export default function Home() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [usercookie, setusercookie] = useState('');

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

  const url = `https://codeforces.com/api/user.status?handle=${usercookie}`;

  useEffect(() => {

    if(usercookie!=='')
    {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
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
  
    fetchData();}
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
'string suffix structures',
'strings',
'ternary search',
'trees',
'two pointers',];

const tagToCount = {};

const uniqueProblems = new Set();

acceptedData.forEach(user => {
  const problemKey = `${user.problem.contestId}-${user.problem.index}`;

  // Check for duplicate problem
  if (uniqueProblems.has(problemKey)) {
    // Handle duplicate problem (e.g., skip, log, etc.)
    console.error(`Duplicate problem found: ${problemKey}`);
    return;
  }

  uniqueProblems.add(problemKey);

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






const totalCounts = Object.values(tagToCount).reduce((acc, count) => acc + count, 0);
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


const generateGlowingColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsla(${hue}, 100%, 50%, 0.7)`;
};

const dataForChart = {
  labels: Object.keys(tagToCount),
  datasets: [
    {
      
      data: Object.values(tagToCount),
      backgroundColor: 
        
           tagColors

      ,
      borderColor: [
        'white'
         
      ],
      borderWidth: 1,
    
     
    },
  ],
  
};




  return usercookie === '' ? (
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
    <div className='flex justify-center my-10'>

<div
    className="chart-container flex flex-row gap-x-20 justify-center items-center  border border-solid border-gray-300 rounded "
    style={{ position: 'relative', height: '60vh', width: '70vw',padding:'50px' }}
  >
    <Doughnut
      data={dataForChart}
      options={{
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
          legend: {
            display:false,
            

          },
        },
      }}
      
    />
 <div className={`tags flex flex-col gap-4`} style={{ height: '50vh', overflowY: 'auto' }}>
      {datacolor.map(([tag, count, color], index) => (
        <div key={index} className='flex flex-row gap-2'>
        {index>0 &&
        <>
          <div className='tagbox' style={{
            width: '30px',
            height: '30px',
            borderRadius: '8px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: color,
          }}></div>
          <div className='tagename mt-2' style={{ fontSize: '14px', fontWeight: 'bold'  }}>
            {tag} - {count}
          </div>
          </>}
        </div>
      ))}
    </div>

    
  </div>
    
    </div>
  
    
  );
}
