import { Sans } from "@artsy/palette"
import { Overview_artist } from "__generated__/Overview_artist.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistBioFragmentContainer as ArtistBio } from "Styleguide/Components/ArtistBio"
import { MarketInsightsFragmentContainer as MarketInsights } from "Styleguide/Components/MarketInsights"
import { SelectedExhibitionFragmentContainer as SelectedExhibitions } from "Styleguide/Components/SelectedExhibitions"
import { Box } from "Styleguide/Elements/Box"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"
import { ArtworkFilterFragmentContainer as ArtworkFilter } from "Styleguide/Pages/Artist/Routes/Overview/Components/ArtworkFilter"
import { GenesFragmentContainer as Genes } from "Styleguide/Pages/Artist/Routes/Overview/Components/Genes"
import { Subscribe } from "unstated"
import { CurrentEventFragmentContainer as CurrentEvent } from "./Components/CurrentEvent"
import { FilterState } from "./state"

export interface OverviewRouteProps {
  artist: Overview_artist
}

const OverviewRoute = (props: OverviewRouteProps) => {
  return (
    <Subscribe to={[FilterState]}>
      {filters => {
        const { page, ...filtersWithoutPage } = filters.state

        return (
          <React.Fragment>
            <Row>
              <Col sm={9}>
                <MarketInsights artist={props.artist as any} />
                <Spacer mb={1} />

                <SelectedExhibitions
                  exhibitions={
                    props.artist.exhibition_highlights.slice(0, 10) as any
                  }
                />

                <Box mt={3} mb={1}>
                  <ArtistBio bio={props.artist as any} />
                </Box>

                <Genes artist={props.artist as any} />

                <Spacer mb={1} />

                <Sans size="2" color="black60">
                  <a href="#">Consign</a> a work by this artist.
                </Sans>
              </Col>
              <Col sm={3}>
                <Box pl={2}>
                  <CurrentEvent artist={props.artist as any} />
                </Box>
              </Col>
            </Row>

            <Spacer mb={4} />

            <Row>
              <Col>
                <span id="jump--artistArtworkGrid" />

                <ArtworkFilter
                  artist={props.artist as any}
                  filters={filtersWithoutPage}
                />
              </Col>
            </Row>
          </React.Fragment>
        )
      }}
    </Subscribe>
  )
}

export const OverviewRouteFragmentContainer = createFragmentContainer(
  OverviewRoute,
  graphql`
    fragment Overview_artist on Artist {
      ...ArtistHeader_artist
      ...ArtistBio_bio
      ...CurrentEvent_artist
      ...MarketInsightsArtistPage_artist

      exhibition_highlights(size: 15) {
        ...SelectedExhibitions_exhibitions
      }

      ...Genes_artist

      ...ArtworkFilter_artist
        @arguments(
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
        )
    }
  `
)
