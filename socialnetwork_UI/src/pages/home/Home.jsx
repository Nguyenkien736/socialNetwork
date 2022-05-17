import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import Topbar from '../../components/topbar/topbar'
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/feed";
import './home.css'
import Slider from "../../components/slide/slide";
import { Thread } from "../../components/thread/thread";
import { SliderData } from "../../components/slide/SliderData";
export default function Home()
{
    return(
        <div >
            <Topbar></Topbar>
            <div className="body">
            <Leftbar></Leftbar>
            <Feed>
               
            </Feed>
            </div>
            
        </div>
    )
}

// TODO: notification