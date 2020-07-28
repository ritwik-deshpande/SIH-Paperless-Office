import React from 'react';
import { Helmet } from "react-helmet";
const styles = theme => ({
  numCardNumber: {
		margin: "auto",
    // flex: '1 0 auto',
		padding: theme.spacing(1),
		// alignItems: "flex-start",
	},
});

export default function RaceChart() {
    
    return(<div className="RaceChart">
    <Helmet>
      <script src="https://public.flourish.studio/resources/embed.js" />
    </Helmet>
    <div
      class="flourish-embed flourish-bar-chart-race"
      data-src="visualisation/3307459"
      data-url="https://flo.uri.sh/visualisation/3307459/embed"
    />
  </div>
    )
}