import { useEffect, useState } from "react";
import axios from "axios";
import ReactAudioPlayer from 'react-audio-player';


export const Home = () => {

    const [songs , setSongs] = useState([]);
    const [alone , setAlone] = useState('');
    const [auto , setAuto] = useState(false);

    const getSongs = () => {

        axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/studiod9c0baf.json')
           .then((data) => {
           
            console.log(data.data);
            setSongs(data.data);
            setAlone(data.data[0]);
    
           })
           .catch((err) => console.log(err.message))  
   }

   const handleClick = (e) => {
       setAlone(e);
       setAuto(true);
     
   }

useEffect(()=> {
 getSongs();
} , []);


if(songs.length === 0) {
    return (
        <div>loading....</div>
    )
}

    return(

         
        <div id='box'>

        <div id='songs'>

          {songs.map((e,i) => (
  
           <div id='songsbox' key={i} onClick={() => handleClick(e)}>

             <img src={e.cover_image} alt=''/> 

           <div id='color-c'>
           <p>{e.song}</p>
           <p>{e.artists} </p>
          </div>

           </div>

          ))}

        </div>


<div id='side'>

<img src={alone.cover_image} alt=''/> 

<div>
<p>{alone.artists} </p>
 <p>{alone.song}</p>

 <ReactAudioPlayer
   src={alone.url}
   controls
   autoPlay={auto}
   id='play'
   />

</div>
     
</div>

</div>

        
       
    )
}