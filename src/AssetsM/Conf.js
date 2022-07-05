const Config = {

    // main variables
    SystemTag: 'alimentaire', //'cosmetique',
    //ApiLink : 'http://localhost:3005',
    ApiLink : 'http://localhost:3005/System', //https://api.anaslouma.tn/System
    themeColor : '#1560bd',
    TostErrorGonf : {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    },
    TostSuucessGonf : {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    },

    //NavBar Items
    NavsData : [
        {id:1, name:"Acceuil", icon:"house", link:"ma"},
        {id:2, name:"Commandes", icon:"calendar2-check", link:"rq"},
        {id:3, name:"Stock", icon:"upc-scan", link:"sk"},
        {id:4, name:"Factures", icon:"receipt-cutoff", link:"ft"},
        {id:5, name:"Camions", icon:"truck", link:"cm"},
        {id:6, name:"Clients", icon:"people", link:"cl"},
        {id:7, name:"Outils", icon:"tools", link:"ot"},
    ],


    //Aceuil
    Main : {
            //main stat card
            LinkCard : [
                { id: 1, col: 3 , tag:"article", icon: 'upc-scan', link:'sk/ajouter', smallT: 'Article', desc: 'Nouveaux Article' , stat:'22452'},
                { id: 2, col: 3 , tag:"facture", icon: 'receipt-cutoff', link:'ft/ajouter', smallT: 'Factures', desc: 'Ajouter Facture' , stat:'22452'},
                { id: 3, col: 3 , tag:"client", icon: 'person', link:'cl/ajouter', smallT: 'Clients', desc: 'Ajouter Clients' , stat:'1235'},
                { id: 4, col: 3 , tag:"camion", icon: 'truck', link:'cm/ajouter-f', smallT: 'Camions', desc: 'Ajouter Fond' , stat:'22'},
            ],

            //main chart card
            ChartCard : [
                {id:1, genre: 'b', col:5},
                {id:2, genre: 'l', col:7},
            ],
    },

    //Commandes
    commandes :{

    },

    //Stock
    stock :{
        //braedCrumb
        BreadCrumb:{
            stockAddArticle: [
                {id:1, name:'Stock', linkable:true, link:"/S/sk"},
                {id:2, name:'Ajouter Article', linkable:false}
            ],
            stockFamille: [
                {id:1, name:'Stock', linkable:true, link:"/S/sk"},
                {id:2, name:'Familles', linkable:false}
            ],
            stockBE: [
                {id:1, name:'Stock', linkable:true, link:"/S/sk"},
                {id:2, name:'Bon d\'entre', linkable:false}
            ],
            stockBS: [
                {id:1, name:'Stock', linkable:true, link:"/S/sk"},
                {id:2, name:'Bon de sortie', linkable:false}
            ],
            stockInfo: [
                {id:1, name:'Stock', linkable:true, link:"/S/sk"},
                {id:2, name:'Information', linkable:false}
            ],
        },
        SubNavs: [
            {id:1,  icon: 'bookmark-plus', text: 'Nouveaux article', link: 'ajouter', dropD: false},
            {id:2, icon: 'tags', text: 'Famille', link: 'famille', dropD: false },
            {
                id: 3, icon: 'person', text: 'Bons', link: '#', dropD: true, dropDD:
                    [
                        { id: 1, icon: 'plus-circle', text: "Bon d'entre ", link: 'be' },
                        { id: 2, icon: 'dash-circle', text: 'Bon de sortie', link: 'bs' }
                   ]
            },
        ],
        TableHead:{
            stock:['*','Code', 'Nom', 'Genre','Stock','Prix','Voir'],
        }
    },

    //Factures
    factures :{
        //braedCrumb
        BreadCrumb:{
            factureAjouter:[
                {id:1, name:'Factures', linkable:true, link:"/S/ft"},
                {id:2, name:'Ajouter Facture', linkable:false}
            ]
        },
        SubNavs: [
            {id:1,  icon: 'receipt', text: 'Nouveaux Fcature', link: '../ajouter', dropD: false},
            {id:2,  icon: 'file-earmark-medical-fill', text: 'Resumer', link: '../ajouter', dropD: false},
        ],
        TableHead:{
            stock:['*','Code', 'Nom', 'Genre','Stock','Prix','Voir'],
        }

    },

    //camions
    camions :{

    },

    //client
    stock :{

    },

    //braedCrumb
    BreadCrumb:{
        stockAddArticle: [
            {id:1, name:'Stock', linkable:true, link:"/S/sk"},
            {id:2, name:'Ajouter Article', linkable:false}
        ],
        stockFamille: [
            {id:1, name:'Stock', linkable:true, link:"/S/sk"},
            {id:2, name:'Familles', linkable:false}
        ],
        stockBE: [
            {id:1, name:'Stock', linkable:true, link:"/S/sk"},
            {id:2, name:'Bon d\'entre', linkable:false}
        ],
        stockBS: [
            {id:1, name:'Stock', linkable:true, link:"/S/sk"},
            {id:2, name:'Bon de sortie', linkable:false}
        ],
        stockInfo: [
            {id:1, name:'Stock', linkable:true, link:"/S/sk"},
            {id:2, name:'Information', linkable:false}
        ],
        CamionAdd: [
            {id:1, name:'Camion', linkable:true, link:"/S/cm"},
            {id:2, name:'Ajouter Camion', linkable:false}
        ],
        factureAjouter:[
            {id:1, name:'Factures', linkable:true, link:"/S/ft"},
            {id:2, name:'Ajouter Facture', linkable:false}
        ]
    },

    //SubNavs
    SubNavs: {
        request: [
            {id:1,  icon: 'check-circle', text: 'Accepté', link: '../g/accepte', dropD: false},
            {id:2,  icon: 'x-circle', text: 'Refusé', link: '../g/refusee', dropD: false},
            {id:3, icon: 'exclamation-circle', text: 'En Attent', link: '../g/en-attent', dropD: false },
        ],
        camion: [
            {id:1,  icon: 'plus-circle', text: 'Ajouter Camion', link: '../ajouter-c', dropD: false},
            {id:2,  icon: 'truck', text: 'Ajouter Fonds', link: '../ajouter-f', dropD: false},
        ],
        Stock: [
            {id:1,  icon: 'bookmark-plus', text: 'Nouveaux article', link: 'ajouter', dropD: false},
            {id:2, icon: 'tags', text: 'Famille', link: 'famille', dropD: false },
            {
                id: 3, icon: 'person', text: 'Bons', link: '#', dropD: true, dropDD:
                    [
                        { id: 1, icon: 'plus-circle', text: "Bon d'entre ", link: 'be' },
                        { id: 2, icon: 'dash-circle', text: 'Bon de sortie', link: 'bs' }
                   ]
            },
        ],
        facture: [
            {id:1,  icon: 'receipt', text: 'Nouveaux Fcature', link: '../ajouter', dropD: false},
            {id:2,  icon: 'file-earmark-medical-fill', text: 'Resumer', link: '../ajouter', dropD: false},
        ],
        client: [
            {id:1,  icon: 'person-plus-fill', text: 'Nouveaux Client', link: '../ajouter', dropD: false},
            {id:2,  icon: 'map-fill', text: 'Régions', link: '../regions', dropD: false},
            {id:3,  icon: 'pin-map-fill', text: 'Clients Map', link: '../map', dropD: false},
        ],
    },
    
    //TableHead
    TableHead:{
        facture:['*','ID','Client','Jour','Totale','Stock','Chauffeur','Voir'],
        request:['*','Client', 'Passé le','Volu le','Totale','Etat','Voir'],
        stock:['*','Code', 'Nom', 'Genre','Stock','Prix','Voir'],
        camion:['*','Camion','Matricule', 'Chauffeur','Facture N','Recette','Voir'],
        client:['*','Nom','Tel', 'Matricule','Adresse','Factures','Voir'],
        team:['Nom','Etat', 'Post','Commencé']

    },

    //setting
    Setting: [
        { id: '01', title: "Activation", image: "01", description: "Etat de cabinet, camera, laboratoire ...", link:"activation"},
        { id: '02', title: "Profile", image: "02", description: "moupouhpouhpouhpouhpuohpouhp...", link:"p/1",
          items:[
                {id: 1, genre:'C', title:"Ouverture & Fermeture", icon:"bell-fill", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:'checked'},
                {id: 2, genre:'C', title:"Permission des Commentaires", icon:"chat-left-quote-fill", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
                {id: 3, genre:'I', title:"Reception des Messages", icon:"envelope-paper-heart-fill", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
            ]
        },
        { id: '03', title: "Clients", image: "03", description: "Etat de cabinet, camera, laboratoire ...", link:"p/2",
            items:[
                {id: 1, genre:'C', title:"Ouverture & Fermeture", icon:"bell-fill", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:'checked'},
                {id: 2, genre:'C', title:"Permission des Commentaires", icon:"chat-left-quote-fill", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
                {id: 3, genre:'I', title:"Reception des Messages", icon:"envelope-paper-heart-fill", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
            ]
        },
        { id: '04', title: "Demandes", image: "04", description: "Etat de cabinet, camera, laboratoire ...", link:"p/3",
            items:[
                {id: 1, genre:'C', title:"Reception des demandes", icon:"calendar3", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:'checked'},
                {id: 2, genre:'C', title:"Retardement Automatique des demandes", icon:"arrow-repeat", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
                {id: 3, genre:'I', title:"Nombre maximale des demandes", icon:"shuffle", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
                {id: 4, genre:'C', title:"Autorisation des demandes pour clients", icon:"stars", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
            ]
        },
        { id: '05', title: "Controle", image: "05", description: "Etat de cabinet, camera, laboratoire ...", link:"p/4",
            items:[
                {id: 1, genre:'I', title:" Compt Bancaire ", icon:"credit-card-2-front-fill", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:'checked'},
                {id: 2, genre:'C', title:" Réception monetique", icon:"currency-dollar", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
                {id: 3, genre:'C', title:" Auto-paymment des factures", icon:"receipt-cutoff", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
            ]
        },
        { id: '06', title: "Equipe", image: "06", description: "Etat de cabinet, camera, laboratoire ...", link:"p/5",
            items:[
                {id: 1, genre:'C', title:" Recéptions des exigence d'emploi", icon:"file-earmark-person", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:'checked'},
                {id: 2, genre:'C', title:" Automatisation des systemes de l'equipe", icon:"play-fill", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
                {id: 3, genre:'C', title:" Communication avec l'equipe", icon:"chat-text-fill", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
                {id: 4, genre:'I', title:" Nombre maximale des missions", icon:"check2-square", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
            ]
        },
        // { id: '07', title: "Données", image: "06", description: "Etat de cabinet, camera, laboratoire ...", link:"ma"},
    ]
}
 
export default Config 