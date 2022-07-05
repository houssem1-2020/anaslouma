import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Outlet} from "react-router-dom";
import GConf from '../generalConf';

//navBar
import NavBar from '../../Dashboard/navBar'

//Main
import MainPage from '../../Dashboard/Main/mainPage';

//Commandes
import RequestPage from '../../Dashboard/Requests/requestPage';
import RequestInfo from "../../Dashboard/Requests/requestInfo";
import RegrouperCommandes from '../../Dashboard/Requests/regroupemment';
import ComptesCommandes from '../../Dashboard/Requests/comptes';
import CalendarCommandes from '../../Dashboard/Requests/calendar';

//Stock
import StockPage from '../../Dashboard/Stock/stockPage';
import AddArticleStock from '../../Dashboard/Stock/addArticle';
import ArticleInfo from "../../Dashboard/Stock/articleInfo";
import Familles from "../../Dashboard/Stock/famille";
import BonSortie from '../../Dashboard/Stock/bonSortie';
import BonsEntre from '../../Dashboard/Stock/bonEntre';

//Facture
import FacturePage from "../../Dashboard/Factures/facturePage";
import AjouterFacture from "../../Dashboard/Factures/ajoutreFacture";
import FactureInfo from "../../Dashboard/Factures/infoFacture";
import EditFacture from "../../Dashboard/Factures/editFacture";
import ResumerFactures from '../../Dashboard/Factures/resumerFactures';

//Camion 
import ControlPage from '../../Dashboard/Control/controlPage'
import AjouterCamion from "../../Dashboard/Control/ajouterCamion";
import AjouterFond from "../../Dashboard/Control/ajouterFonds";
import CamionInfo from '../../Dashboard/Control/camionInfo'
import CamionArticleInfo from "../../Dashboard/Control/Info/articleInfo";
import CamionFactureInfo from "../../Dashboard/Control/Info/factureInfo";
import CamionFondInfo from "../../Dashboard/Control/Info/fondInfo";
import InventaireCamion from '../../Dashboard/Control/inventaireCamion';
import EditFond from '../../Dashboard/Control/editFonds';

//Client
import ClientPage from '../../Dashboard/Client/clientPage';
import AjouterClient from "../../Dashboard/Client/ajouterClient";
import ClientInfo from '../../Dashboard/Client/clientInfo'
import ClientRegions from "../../Dashboard/Client/clientRegions";
import ClientMap from "../../Dashboard/Client/clientMap";

//Outils
import ToolsPage from '../../Dashboard/Tools/toolsPage';

///* Messages */
import MessagesPages from '../../Dashboard/Messages/messagesPage'

///* Notification */
import NotificationPage from '../../Dashboard/Notifications/notificationPage';





const SystemLanding = () => {
    useEffect(() => {
        const pidIsSet = localStorage.getItem(`${GConf.SystemTag}_Secure_key`);
        if (!pidIsSet) {window.location.href = "/login";}
    },[]);
    
    return (<>
        <NavBar/>
        <br />
        <br />
        <br />
        <div className="container pt-4">
            <Outlet />
        </div>
    </>);
}

const systemRouter = () => (
        <Route path="S" exact element={<SystemLanding />} >
            <Route path="" exact element={<MainPage />} />
            <Route path="ma" exact element={<MainPage />} />
            <Route path="rq" exact element={<Outlet />} >
                <Route path="" exact element={<RequestPage />} />
                <Route path="comptes" exact element={<ComptesCommandes />} />
                <Route path="Regroupemment" exact element={<RegrouperCommandes />} />
                <Route path="calendrier" exact element={<CalendarCommandes />} />
                <Route path="info/:CID" exact element={<RequestInfo />} />
            </Route>
            <Route path="sk" exact element={<Outlet />}>
                <Route path="" exact element={<StockPage />} />
                <Route path="ajouter" exact element={<AddArticleStock />} />
                <Route path="bs" exact element={< BonSortie />} />
                <Route path="be" exact element={<BonsEntre />} />
                <Route path="famille" exact element={<Familles />} />
                <Route path="info/:code" exact element={<ArticleInfo />} />
            </Route>
            <Route path="ft" exact element={<Outlet />}>
                <Route path="" exact element={<FacturePage />} />
                <Route path="ajouter" exact element={<AjouterFacture />} />
                <Route path="resumer" exact element={<ResumerFactures />} />
                <Route path="modifier/:FID" exact element={<EditFacture />} />
                <Route path="info/:FID" exact element={<FactureInfo />} />
            </Route>
            <Route path="cm" exact element={<Outlet />}>
                <Route path="" exact element={<ControlPage />} />
                <Route path="ajouter-c" exact element={<AjouterCamion />} />
                <Route path="ajouter-f" exact element={<AjouterFond />} />
                <Route path="modifier-f/:FondID" exact element={<EditFond />} />
                <Route path="inventaire" exact element={<InventaireCamion />}/>
                <Route path="info/:CID" exact element={<CamionInfo />} />
                <Route path="info/stock/:CID/:Article" exact element={<CamionArticleInfo />} />
                <Route path="info/facture/:CID/:FID" exact element={<CamionFactureInfo />} />
                <Route path="info/fond/:CID/:FondID" exact element={<CamionFondInfo />} />
            </Route>
            <Route path="cl" exact element={<Outlet />} >
                <Route path="" exact element={<ClientPage />} />
                <Route path="ajouter" exact element={<AjouterClient />} />
                <Route path="info/:CLID" exact element={<ClientInfo />} />
                <Route path="map" exact element={<ClientMap />} />
                <Route path="regions" exact element={<ClientRegions />} />
            </Route>
            <Route path="ot" exact element={<ToolsPage />} />
            <Route path="nt" exact element={<NotificationPage />} />
            <Route path="msg" exact element={<MessagesPages />} />
        </Route>
)

export default systemRouter 