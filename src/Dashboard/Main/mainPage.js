import React  , { useEffect, useState } from 'react';
import axios from 'axios';
import GConf from '../../AssetsM/generalConf';
import date from 'date-and-time';
import fr from 'date-and-time/locale/fr';
import { Bounce } from 'react-reveal';
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { NavLink } from 'react-router-dom';
import CountUp from 'react-countup';

function MainPage() {
    /*#########################[Const]##################################*/
    const localsystemTag = localStorage.getItem(`${GConf.SystemTag}_Secure_key`);
    const [status, setStat] = useState([]); 
    const [PieData, setPieData]= useState([])
    const [genreD, setGenreD]= useState([])
    const [commandeD, setCommandeD]= useState([])
    const [dataBar, setDataBar]= useState([])
    const [depoTR, setDepoRT]= useState([])
    const now = new Date();
    date.locale(fr)

   /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/ma/stat`, {
            TAG: GConf.SystemTag,
          })
          .then(function (response) {
            if(response.data[0].autoLogOut[0].Permission_Key != localsystemTag){LogOut()}
            setStat(response.data[0])
            
            let clientDis = []
            response.data[0].clientDistro.map((datacld) => clientDis.push({ name: datacld.Gouv, value: datacld.Totale }))
            setPieData(clientDis)

            let genreDist = []
            response.data[0].genreDistro.map((datacld) => genreDist.push({ name: datacld.Genre, value: datacld.Totale }))
            setGenreD(genreDist)

            let commandeDist = []
            response.data[0].commandeDistro.map((datacld) => commandeDist.push({ name: datacld.State, value: datacld.Totale }))
            setCommandeD(commandeDist)
            
            let camionRT = []
            response.data[0].camionStat.map((data) => camionRT.push({ name: data.Chauffeur, value: data.Recette }))
            setDataBar(camionRT)

            let DepoRT = []
            response.data[0].RecetteDepo.map((data) => DepoRT.push({ name: new Date(data.Cre_Date).toLocaleDateString('en-US'),  value: data.Totale.toFixed(3) }))
            setDepoRT(DepoRT)
        })
         
    }, [])

    
    /*#########################[Card]##################################*/
    const LinkCard =  (props) => {

        return (<>
        
                <div className={`col-12 col-md-${props.col} mb-3`}>
                    <div className="card card-body shadow-sm pb-2">
                        <NavLink exact="true" to={`../${props.link}`}   className="stretched-link" />
                        <div className="row">
                            <div className="col-4 align-self-center p-2">
                            <span className={`bi bi-${props.icon} bi-lg`} style={{color:GConf.themeColor}}></span>
                            </div>
                            <div className='col-8 align-self-center text-end p-2'>
                                <div className="text-center">
                                <h3 ><CountUp end={props.stat} duration={3} /></h3>
                                    <small>{props.smallT}</small>
                                </div>
                            </div>
                        <div className='col-12 border-top pt-1'>
                            <div className="row p-2" style={{color:GConf.themeColor}}>
                                <div className="col-10 align-self-center">{props.desc}</div>
                                <div className="col-2 align-self-center"><span className="bi bi-arrow-right-short bi-sm"></span></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
               
        </>);
    }
    const PieChartCard =  (props) =>{
        
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
        return (
            <PieChart width={300} height={200} >
              <Pie
                data={props.data}
                cx={150}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {PieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          );
    }
    const LineChts = (props) => {
        return (<>
           <ResponsiveContainer width="100%" height={150} >
                <AreaChart
                    width={200}
                    height={60}
                    data={depoTR}
                    margin={{ top: 20, right: 0, left: 0, bottom: 0, }}
                >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={GConf.themeColor} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={GConf.themeColor} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                    <Tooltip />
                        <Area type="monotone" dataKey="value" stroke={GConf.themeColor} strokeWidth={3} fill="url(#colorUv)" />
                        <XAxis hide  dataKey="name" />
                        <YAxis hide />
          </AreaChart>
            </ResponsiveContainer>
        </>)
    }
    const BarCht = (props) => {

        return (<>
        <ResponsiveContainer  height={150} >
            <BarChart
                layout="vertical"
                data={dataBar} 
            >
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill={GConf.themeColor}  barSize={15}  radius={[0, 10, 10, 0]}/>
                <XAxis type="number" domain={[0, (Math.max(...dataBar.map(o => o.value)) + 10)]} hide  dataKey="value"/>
                <YAxis type="category"   dataKey='name' />
                
            </BarChart>
        </ResponsiveContainer>
        </>)
    }
    const TopCardTime = () =>{
        return(<>
            <div className='card card-body mb-4 rounded-system  main-big-card shaodw-sm'>
                <div className='row'>
                    <div className='col-8'>
                        <h1 className='text-white display-1'>{date.format(now, 'dddd')}</h1>
                        <h1 className='text-white'>{date.format(now, ' DD - MMMM - YYYY')}</h1>
                    </div>
                    <div className='col-4 text-end align-self-center'>
                        <h1 style={{color:GConf.themeColor}}>{date.format(now, 'HH:mm')}</h1>
                    </div>
                </div>
            </div>
        </>)
    }
    const LinksCrads = () => {
        return(<>
            <div className="row justify-content-center mb-4">
                {GConf.LinkCard.map((stat) =>
                    <LinkCard key={stat.id} col={stat.col} icon={stat.icon} link={stat.link} stat={status[stat.dataTag]} smallT={stat.smallT} desc={stat.desc} />
                )}
            </div>
        </>)
    }
    const ChartsContainer = (props) =>{
        return(<>
                <div className={`col-12 col-lg-${props.col}`}>
                    <div className="card p-1 shadow-sm mb-2 ">
                        <h6 className='card-body'><b>{props.title}</b></h6>
                        {props.chart}
                    </div>
                </div>
                </>)
    }
    const LogOut = () =>{
        localStorage.clear();
        window.location.href = "/login";
    }
    return (<>
        <br />
        <TopCardTime />
        <Bounce bottom> 
            <LinksCrads /> 
            <div className="row justify-content-center mb-4">
                <ChartsContainer chart={<BarCht />} col='5' title='Recette des Camions' />
                <ChartsContainer chart={<LineChts  data={depoTR}/>} col='7' title='Evolution de Recette Depo' />
                <ChartsContainer chart={<PieChartCard data={PieData}/>} col='4' title='Distrubition des client' />
                <ChartsContainer chart={<PieChartCard data={genreD}/>} col='4' title='Distrubition des articless' />
                <ChartsContainer chart={<PieChartCard data={commandeD}/>} col='4' title='Distrubition des commandes' />
            </div>    
        </Bounce>    
    </>);
}

export default MainPage;