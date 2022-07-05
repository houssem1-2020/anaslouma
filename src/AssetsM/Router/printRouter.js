import React from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet} from "react-router-dom";


//Printing Pages
import FactureTemp from '../../Printing/facture';
import BonsLivTemp from '../../Printing/factureBonLS';
import CommandeTemp from '../../Printing/commandes';
import CamionVente from '../../Printing/camionVente';
import RecetteDepo from '../../Printing/toolsRecette';
import PrintPrix from '../../Printing/toolsPrintPrix';
import PrintStock from '../../Printing/toolsPrintStock';
import ResumerArticle from '../../Printing/stockResumerArticle';
import CamionFacture from '../../Printing/camionFacture';
import CamionFond from '../../Printing/camionFond';
import CamionStock from '../../Printing/camionStock';
import CamionInventaire from '../../Printing/camionInventaire';
import CamionStockArticle from '../../Printing/camionStockArticle';
import CamionFondTemp from '../../Printing/camionFondTemp';
import CamionFactureTemp from '../../Printing/camionFacture';
import CamionRecetteList from '../../Printing/camionRecetteList';
import CamionVenteArticles from '../../Printing/camionVenteArticles';


const PrintingRouter = () => (
        <Route path="Pr">
            <Route path="facture/:fid" element={<FactureTemp />} />
            <Route path="bonL/:fid" element={<BonsLivTemp genre='Livraision' />} />
            <Route path="bonS/:fid" element={<BonsLivTemp genre='Sortie'/>} />
            <Route path="Stock/resumer/:code/:s/:e" element={<ResumerArticle />} />
            <Route path="commande/:cid" element={<CommandeTemp />} />
            <Route path="camion/inventaire/:iid" element={<CamionInventaire />} />
            <Route path="camion/info/stock/:cid" element={<CamionStock />} />
            <Route path="camion/info/stockZero/:cid" element={<CamionStock zero />} />
            <Route path="camion/info/stock/article/:cid/:aid" element={<CamionStockArticle />} />
            <Route path="camion/info/vente/:cid/:d" element={<CamionVente />} />
            <Route path="camion/info/vente/articles/:cid/:d" element={<CamionVenteArticles />} />
            <Route path="camion/info/recette/:cid/:s/:e" element={<CamionRecetteList />} />
            <Route path="camion/info/fond/:cid/:s/:e" element={<CamionFond />} />
            <Route path="camion/info/fondTemp/:fid" element={<CamionFondTemp />} />
            <Route path="camion/info/facture/:fid" element={<CamionFactureTemp />} />
            <Route path="recette/:s/:e" element={<RecetteDepo />} />
            <Route path="tools/print/prix/:g" element={<PrintPrix />} />
            <Route path="tools/print/stock/:g" element={<PrintStock />} />
        </Route> 
)

export default PrintingRouter 