const InputLinks = {
    //themeColor: '#2f8d99',
    main : [
        {id:1, link:'cm', icon:'receipt-cutoff', text:'COMMANDES', desc:''},
        {id:2, link:'mc', icon:'box2-heart-fill', text:'MES COMMANDES', desc:''},
        {id:3, link:'cg', icon:'folder2-open', text:'CATALOQUE', desc:''},
        {id:4, link:'cl', icon:'person-rolodex', text:'CLIENTS', desc:''},    
    ],

    client : [
        {id:1, link:'ajouter', icon:'person-plus-fill', text:'Ajouter Client', desc:''},
        {id:2, link:'recherche', icon:'search', text:'Recherche', desc:''},
        {id:3, link:'pointage', icon:'geo-alt', text:'Pointage', desc:''},
        {id:4, link:'List', icon:'person-lines-fill', text:'Liste Compléte', desc:''},
    ],
    facture : [
        {id:1, link:'recent', icon:'box2-heart-fill', text:'Mes Commandes', desc:''},
        {id:2, link:'recherche', icon:'search', text:'Recherche', desc:''},
    ],
    stock : [
        {id:1, link:'List', icon:'folder2-open', text:'Mon Stock', desc:''},
        {id:2, link:'familles', icon:'boxes', text:'Familles', desc:''},
        // {id:3, link:'ajout-ph', icon:'images', text:'Ajouter Photoes ', desc:''},
    ],

    //return back card 
    backCard:{
        nv : {id:1, text:'Nouveaux Commande', link:'/C/L'},
        cl : {id:2, text:'Client', link:'/C/L'},
        clAdd : {id:3, text:'Ajouter Client', link:'/C/L/cl'},
        clPtg : {id:4, text:'Pointage des Clients', link:'/C/L/cl'},
        clMap : {id:5, text:'Recherche des Clients', link:'/C/L/cl'},
        clList : {id:6, text:'Liste des Clients', link:'/C/L/cl'},
        mc : {id:7, text:'Mes Commandes', link:'/C/L'},
        mcInfo : {id:8, text:'Commande Info', link:'/C/L/mc'},
        cg : {id:9, text:'Catalogue', link:'/C/L'},
        cgList : {id:10, text:'Liste des Articles', link:'/C/L/cg'},
        cgFamille : {id:11, text:'Liste des Familles', link:'/C/L/cg'},
        cgInfo : {id:12, text:'Info Sur Article', link:'/C/L/cg'},
        cgPhoto: {id:13, text:'Ajoiuter Photo', link:'/C/L/cg'},
    }
}
export default InputLinks