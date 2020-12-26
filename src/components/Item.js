import React, { Component,createRef} from "react";
import Styles from "./Item.module.css";
import axios from "axios";
import Search from "./Search";
import List from "./List";
import Downloader from './Downloader'
import thumbnailload from '../images/BubblePreloader.gif'
import titleload from '../images/MessagePreloader.gif'
const urll="https://youtube-downloader11.herokuapp.com";
const key=process.env.REACT_APP_KEY
const maxresult = 30;
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      things: "Loading...",
      videoList: [{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}}],
      toggle: "Show",
      video: {},
      description: ``,
      text: "covid 19 news",
      title: "",
      notwork:true,
      called:false,
      showdownload:false
   
    };
    this.goup =createRef();
  }
  youtube = async () => {
    this.setState({videoList:[{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}},{title:titleload,bestThumbnail:{url:thumbnailload}}]})
    this.setState({things:'Loading...'})
    this.setState({title:''})
    if(!this.state.notwork)
    {await axios
      .get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: "snippet",
          key: key,
          type: "video",
          q: this.state.text,
          maxResults: maxresult,
          controls: 1,
        },
      })
      .then((res) => {
       
        this.setState({ video: res.data.items[0], things: "" });
        this.setState({ title: res.data.items[0].snippet.title });
        this.setState({ videoList: [] });
        this.setState({called:true})
        res.data.items.map((ele) => {
          this.setState({ videoList: [...this.state.videoList, ele] });
          return null;
        });

        return res.data;
      })
      .catch((err) =>{ console.log(err);
        this.setState({notwork:true})
      });

    }
      else{
      
     
        
        axios.get(`${urll}/search/${this.state.text}/${maxresult}`).then((res)=>{
         // console.log(res.data);
         this.setState({things:''})
          this.setState({ video: res.data.items[2], things: "" });
          this.setState({ title: res.data.items[2].title });
          this.setState({ videoList: [] });
          this.setState({called:true})
          res.data.items.map((ele,id) => {
          
            if(ele.type==="video")
            {
              console.log(ele)
              this.setState({ videoList: [...this.state.videoList, ele] });
           
            }
            return null;
          });
        
   


        }).catch((err)=>{
          console.log(err)
        })
      }
  };

  componentDidMount() {
  this.youtube();
 

    this.setState({showdownload:false})
  
          
  }
  show = () => {
    let notwork=this.state.notwork;
    if (this.state.things === "Loading...") {
      return <img  src={thumbnailload} width="100%" height="100%"    frameBorder="0"
      />;
    } else {
      return (
        <div>
          {!notwork?<iframe
            title={this.state.video.id.videoId}
            width="50%"
            height="400"
            src={`https://www.youtube.com/embed/${this.state.video.id.videoId}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>:<iframe
          title={this.state.video.title}
          width="50%"
          height="400"
          src={`https://www.youtube.com/embed/${this.state.video.id}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>}
         
        </div>
      );
    }
  };
  showit = () => {
  if(!this.state.notwork)
  {
    if (this.state.toggle === "Show") {
      this.setState({ toggle: "Hide" });
      this.setState({ description: this.state.video.snippet.description });
    } else {
      this.setState({ toggle: "Show" });
      this.setState({ description: `` });
    }
  }else{
    if (this.state.toggle === "Show") {
      this.setState({ toggle: "Hide" });
      this.setState({ description: this.state.video.description });
    } else {
      this.setState({ toggle: "Show" });
      this.setState({ description: `` });
    }
  }
  };
  butclickhandel = () => {
    this.showit();
  };
  searchhanddler = (tfs) => {
    if (tfs) {
      this.setState({ text: tfs }, () => {
        this.youtube();
      });
      
    } else if (tfs === "") {
      console.log("please write something");
    }
  };
  setselectedvideo = (singlevideo) => {
console.log(singlevideo)
    this.setState({ video: singlevideo, title: singlevideo.title });
    this.goup.scrollIntoView({behavior:"smooth"})
  };
 showdownloadhandle=()=>{
   this.setState({showdownload:false})
 }

  render() {
  
    let showdownload=this.state.showdownload;
    console.log(showdownload)
    return (
      <>
    <div  >
        <Search style={showdownload?{pointerEvents:"none"}:{pointerEvents:"initial"}} searchhanddler={(tfs) => this.searchhanddler(tfs)} />

        <div style={showdownload?{pointerEvents:"none"}:{pointerEvents:"initial"}} ref={ref=>this.goup=ref} id={Styles.mainvideodiv}>
          <div id={Styles.mainvideo}> {this.show()} </div>
          <h2 id={Styles.mainvideotitle}>{this.state.title} </h2>
          <div id={Styles.maindescription}>
            <button
              id={Styles.mainvideodescriptionbut}
              onClick={this.butclickhandel.bind(this)}
            >{`${this.state.toggle} description`}</button>
            <p id={Styles.mainvideodescription}>
              {this.state.description}
              
              <br />
            </p>
            <button onClick={()=>this.setState({showdownload:true})} id={Styles.downloadbut}>Download</button>
           
          
            
          </div>
        </div>
        <div className={Styles.list} style={showdownload?{pointerEvents:"none"}:{pointerEvents:"initial"}}>
         
            <List
              getthevideo={this.setselectedvideo}
              videolists={this.state.videoList}
              notwork={this.state.notwork}
            />
        
        </div>
      </div>
      {this.state.showdownload?<Downloader showdownloadhandle={()=>this.showdownloadhandle()}  toptext={this.state.called?"URL has been selected":"Enter YouTube Video URL"} videotitle={this.state.video.title} videoid={this.state.called?this.state.video.id:""}/>:null}
     
      </>
    );
  }
}
export default Item;
