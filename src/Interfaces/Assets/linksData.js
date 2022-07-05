const InputLinks = {
    themeColor: '#2f8d99',
    main : [
        {id:1, link:'nv', icon:'receipt-cutoff', text:'FACTURE', desc:''},
        {id:2, link:'mf', icon:'folder2-open', text:'MES FACTURES', desc:''},
        {id:3, link:'sk', icon:'box2-heart-fill', text:'STOCK', desc:''},
        {id:4, link:'vt', icon:'cart-check-fill', text:'VENTES', desc:''},
        {id:5, link:'cl', icon:'person-rolodex', text:'CLIENTS', desc:''},
        {id:6, link:'rt', icon:'coin', text:'RECETTE', desc:''},
    ],

    client : [
        {id:1, link:'ajouter', icon:'person-plus-fill', text:'Ajouter Client', desc:''},
        {id:2, link:'recherche', icon:'search', text:'Recherche', desc:''},
        {id:3, link:'pointage', icon:'geo-alt', text:'Pointage', desc:''},
        {id:4, link:'List', icon:'person-lines-fill', text:'Liste Compléte', desc:''},
    ],
    stock : [
        {id:1, link:'List', icon:'box2-heart', text:'Mon Stock', desc:''},
        {id:2, link:'reglemment', icon:'sliders', text:'Reglement ', desc:''},
        {id:3, link:'Inventaire', icon:'ui-checks-grid', text:'Inventaire', desc:''},
    ],
    recette : [
        {id:1, link:'depenses', icon:'menu-app', text:'Depenses', desc:''},
        {id:2, link:'imprimer', icon:'printer-fill', text:'Imprimer', desc:''},
    ],
    ventes : [
        {id:1, link:'journier', icon:'box2-heart', text:'Vente jounriere', desc:''},
        {id:2, link:'recherche', icon:'calendar2-week', text:'Par Jour', desc:''},
    ],

    //return back card 
    backCard:{
        nv : {id:1, text:'Nouveaux Facture', link:'/I/L'},

        mf : {id:7, text:'Mes Factures', link:'/I/L'},
        mfInfo : {id:8, text:'Facture Info', link:'/I/L/mf'},
        mfEdit : {id:8, text:'Modifier Facture', link:'/I/L/mf'},
       
        sk : {id:9, text:'Stock', link:'/I/L'},
        skList : {id:10, text:'Mon Stock', link:'/I/L/sk'},
        skInfo : {id:12, text:'Info Sur Article', link:'/I/L/sk'},
        skRegl: {id:13, text:'Reglemment', link:'/I/L/sk'},
        skInv: {id:13, text:'Inventaire', link:'/I/L/sk'},

        vt : {id:1, text:'Mes Ventes', link:'/I/L'},
        vtRech : {id:1, text:'Recherche', link:'/I/L/vt'},
        vtJour : {id:1, text:'Aujourd\'hui', link:'/I/L/vt'},

        cl : {id:2, text:'Client', link:'/I/L'},
        clAdd : {id:3, text:'Ajouter Client', link:'/I/L/cl'},
        clPtg : {id:4, text:'Pointage des Clients', link:'/I/L/cl'},
        clMap : {id:5, text:'Recherche des Clients', link:'/I/L/cl'},
        clList : {id:6, text:'Liste des Clients', link:'/I/L/cl'},

        rt : {id:1, text:'Recette', link:'/I/L'},
        rtDeps : {id:1, text:'Depenses', link:'/I/L/rt'},
        rtImpr : {id:1, text:'Imprimer', link:'/I/L/rt'},
    }
}
export default InputLinks