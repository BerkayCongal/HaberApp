import { useEffect, useState } from "react";
import { Pagination } from 'antd';

export default function Index() {

    const [data, setData] = useState();
    const [news, setNews] = useState("tr");
    const [category, setCategory] = useState("general");
    const [page , setPages] = useState(1);
    const key  = "3ds0ZwvmGRqW5TJPU5MmFH:5ZFzc4zgFeqg81z2wX41n5";
    const api = `https://api.collectapi.com/news/getNews?country=${news}&tag=${category}&apiKey=${key}&paging=${page}`

    useEffect(() => {
        const getData = async () => {
            try{
                const response = await fetch(api)
                const  json = await response.json();
                setData(json);
                console.log(json);
            }catch(error) {
                console.error("hataaa",error);
            }
        }
        console.log(category);
        getData()
    },[news,category ,page]);


  
    const handleClick = (e) => {
       setCategory(e)
    }
   
    return(
       <div className="container-main">
            <header className="header-main">
                <h1>New Haber</h1>
                <div className="header-category">
                    <button onClick={() =>{handleClick("general")}}>Türkiye ve Dünya Gündemi </button>
                    <button onClick={() =>{handleClick("economy")}}>Ekonomi </button>
                    <button onClick={() => {handleClick("sport")}}>Spor</button>
                    <button onClick={() => {handleClick("technology")}}>Teknoloji</button>
                </div>
            </header>
            
            {data ? data.result.map((x) => {
                return(
                   <div className="data-main" key={x.key} id="datamain"> 
                       <div className="main-container">
                            <img src={x.image} alt="" />
                            <h1>{x.name}</h1>
                            <p>.{x.description}</p>
                            <p className="content">Paylaşan Gazete :{x.source}</p>
                            <h4>Tarih : {x.date.slice(0,10)}</h4>
                            <button onClick={() =>window.location.href = `${x.url}`}>Daha Fazla Bilgi için Tıklayınız... </button>
                       </div>
                   </div>
                    )
                }):"yükleniyor"}
                <div className="pagination"><a href={"#datamain"}><Pagination  defaultCurrent={1} total={50} onChange={(e)=>{setPages(e)} } /></a></div>
       </div>
       
    )
}