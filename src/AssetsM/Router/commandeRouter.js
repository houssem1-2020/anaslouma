import React from 'react'
import { BrowserRouter as Router,Routes,Route, Outlet, Navigate} from "react-router-dom";

//logIn & Landing 
import InputLoginPage from '../../Commande/loginPage'
import InputLandingPage from '../../Commande/commandeLanding'


//ajouter commande
import NouveauxCommande from "../../Commande/NCommande/nouveauxCommande";

//mes commandes
import MesCommandes from "../../Commande/MCommandes/mesCommandes";
import CommandeInfo from "../../Commande/MCommandes/commandesInfo"

// Catalogue 
import Stock from "../../Commande/Catalogue/stockPage";

//clients
import ClientsPage from "../../Commande/Clients/client";
import CommandeRecentList from '../../Commande/MCommandes/commandeList';
import CommandeRecherche from '../../Commande/MCommandes/commandeRecherche';
import CatalogueFamille from '../../Commande/Catalogue/CatalogueFamille';
import ArticleInfo from '../../Commande/Catalogue/ArticleInfo';
import ArticleList from '../../Commande/Catalogue/ArticleList';
import ArticleAjouterPhoto from '../../Commande/Catalogue/ArticleAjouterPhoto';
import ClientPointage from '../../Commande/Clients/clientPointage';
import ClientMap from '../../Commande/Clients/clientMap';
import ClientList from '../../Commande/Clients/clientList';
import AddClient from '../../Commande/Clients/addClient';


const RedirectingPage = () => {
    const CommandeIsLogged = localStorage.getItem('InputCommande');
    return (<>
        {
            CommandeIsLogged ? <Navigate to='/C/L'  /> : <Navigate to='/C/logIn'  />
        } 
</>);}

const commandeRouter = () => (
    <Route path="C" exact element={<Outlet />} >
            <Route path="" exact element={<RedirectingPage />} />
            <Route path="logIn" exact element={<InputLoginPage />} />
            <Route path="L" exact element={<Outlet />} >
                    <Route path="" exact element={<InputLandingPage />} />
                    <Route path="cm" exact element={<NouveauxCommande />} />
                    <Route path="mc" exact element={<Outlet />} >
                        <Route path="" exact element={<CommandeRecentList />} />
                        <Route path="recent" exact element={<CommandeRecentList />} />
                        <Route path="recherche" exact element={<CommandeRecherche />} />
                        <Route path="info/:CID" exact element={<CommandeInfo />} />
                    </Route>
                    <Route path="cg" exact element={<Outlet />} >
                        <Route path="" exact element={<Stock />} />
                        <Route path="List" exact element={<ArticleList />} />
                        <Route path="familles" exact element={<CatalogueFamille />} />
                        <Route path="info/:AID" exact element={<ArticleInfo />} />
                        <Route path="ajout-ph" exact element={<ArticleAjouterPhoto />} />
                    </Route>
                    <Route path="cl" exact element={<Outlet />} >
                        <Route path="" exact element={<ClientsPage />} />
                        <Route path="ajouter" exact element={<AddClient />} />
                        <Route path="recherche" exact element={<ClientMap />} />
                        <Route path="pointage" exact element={<ClientPointage />} />
                        <Route path="List" exact element={<ClientList />} />
                    </Route>
            </Route>
    </Route>
)

export default commandeRouter 