import React, { useEffect } from 'react'

import Suitsetshp from './Suitsetshp';
import  Dresseshp from "./Dresseshp";

function HproductContainer() {

    return (
        <div>
            

            <div class="new_arrivals_agile_w3ls_info"> 
		<div class="container">
		    <h3 class="wthree_text_info">New <span>Arrivals</span></h3>		
				<div id="horizontalTab">
						<ul class="resp-tabs-list">
							<li> SUIT'S SETS</li>
							<li> SAREES</li>
							<li> kURTA SETS</li>
							<li> Footwear</li>
						</ul>
					<div class="resp-tabs-container">
					<Suitsetshp/>
						{/* <!--/tab_two--> */}
						<div class="tab2">
							<Dresseshp/>
						</div>
					 
					</div>
				</div>	
			</div>
		</div>
	{/* <!-- //new_arrivals -->  */}



        </div>
    )
}

export default HproductContainer
