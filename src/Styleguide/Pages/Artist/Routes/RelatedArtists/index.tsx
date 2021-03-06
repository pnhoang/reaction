import { Sans } from "@artsy/palette"
import { RelatedArtists_viewer } from "__generated__/RelatedArtists_viewer.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Spacer } from "Styleguide/Elements/Spacer"
import { RelatedArtistsRefetchContainer as RelatedArtists } from "./RelatedArtistsRefetchContainer"

export interface RelatedArtistsProps {
  viewer: RelatedArtists_viewer
}

export class RelatedArtistsRoute extends React.Component<RelatedArtistsProps> {
  render() {
    const { viewer } = this.props
    return (
      <React.Fragment>
        <Sans size="3" weight="medium">
          Related
        </Sans>

        <Spacer mb={2} />

        <RelatedArtists
          kind={"MAIN"}
          artist={viewer.mainArtists as any}
          scrollTo="#jumpto-RouteTabs"
        />

        <Spacer mb={3} />

        <span id="jumpto-RelatedArtists-Contemporary" />

        <Sans size="3" weight="medium">
          Suggested contemporary
        </Sans>

        <Spacer mb={3} />

        <RelatedArtists
          kind={"CONTEMPORARY"}
          artist={viewer.mainArtists as any}
          scrollTo="#jumpto-RelatedArtists-Contemporary"
        />

        <Spacer mb={1} />
      </React.Fragment>
    )
  }
}

export const RelatedArtistsRouteFragmentContainer = createFragmentContainer(
  RelatedArtistsRoute,
  graphql`
    fragment RelatedArtists_viewer on Viewer
      @argumentDefinitions(
        mainKind: { type: "RelatedArtistsKind", defaultValue: "MAIN" }
        contemporaryKind: {
          type: "RelatedArtistsKind"
          defaultValue: "CONTEMPORARY"
        }
      ) {
      mainArtists: artist(id: $artistID) {
        ...RelatedArtistsRefetchContainer_artist @arguments(kind: $mainKind)
      }
      contemporaryArtists: artist(id: $artistID) {
        ...RelatedArtistsRefetchContainer_artist
          @arguments(kind: $contemporaryKind)
      }
    }
  `
)
