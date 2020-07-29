import React from 'react';
import { Helmet } from "react-helmet";

export default function HBarChart() {
    
    return(<div className="Sunburst">
    <Helmet>
      <script src="https://public.flourish.studio/resources/embed.js" />
    </Helmet>
    <div
     class="flourish-embed flourish-hierarchy" 
     data-src="visualisation/3316194" 
     data-url="https://flo.uri.sh/visualisation/3316194/embed"
    />
  </div>
    )
}
