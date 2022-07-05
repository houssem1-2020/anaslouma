import React from 'react';
import { Grid, _ } from "gridjs-react";

function TableGrid(props) {
    return ( <>
            <Grid   
                data={props.tableData}
                columns={props.columns}
                search = {true}
                sort = {true}
                pagination = {true}
                resizable = {true} 
                language={{
                    search : {
                        placeholder :'🔍 Recherche ...' ,
                        },
                    pagination: {
                            previous: ' ',
                            next: ' ',
                            limit: 2,
                            showing: ' ',
                            of: 'de',
                            to: 'à',
                            results: 'Resultat',
                    },
                    noRecordsFound: '🚩🚩🚩  Pas De Résultat  🚩🚩🚩',
                        
                                
                }}
                className= {{
                    search:'w-100-seach-input',
                    table:'rounded-0',
                    paginationButtonNext:'bi bi-caret-right-fill text-success',
                    paginationButtonPrev :'bi bi-caret-left-fill text-danger' ,
                    table:'w-100-seach-input '
                }}
                style= {{
                    table: {
                        borderRadius: '20px !important'
                    },
                    th:{
                    padding:'10px',
                    },
                    td:{
                        padding:'8px', paddingLeft:'20px'
                    }
                }}     
            />
    </> );
}

export default TableGrid;