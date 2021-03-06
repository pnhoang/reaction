import { Serif } from "@artsy/palette"
import { ArtistHeader_artist } from "__generated__/ArtistHeader_artist.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Slider } from "Styleguide/Components/Slider"
import { Box } from "Styleguide/Elements/Box"
import { Button } from "Styleguide/Elements/Button"
import { Flex } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Styleguide/Utils/Responsive"

interface Props {
  artist: ArtistHeader_artist
}

export class ArtistHeader extends React.Component<Props> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return <SmallArtistHeader {...this.props} />
          else return <LargeArtistHeader {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargeArtistHeader = (props: Props) => {
  const { carousel } = props.artist

  return (
    <Box width="100%">
      <Slider
        height={200}
        data={carousel.images as any}
        render={slide => {
          return (
            <Image
              px={5}
              src={slide.resized.url}
              width={slide.resized.width}
              height={slide.resized.height}
            />
          )
        }}
      />
      <Spacer my={2} />

      <Flex justifyContent="space-between">
        <Box>
          <Serif size="10">{props.artist.name}</Serif>
          <Flex>
            <Serif size="3">
              {props.artist.nationality && `${props.artist.nationality}, `}
              {props.artist.years}
            </Serif>
            <Spacer mr={2} />
            <Serif size="3">
              {props.artist.counts.follows.toLocaleString()} followers
            </Serif>
          </Flex>
        </Box>
        <Button variant="primaryBlack" size="medium">
          Follow
        </Button>
      </Flex>
    </Box>
  )
}

export const SmallArtistHeader = (props: Props) => {
  const { carousel } = props.artist
  return (
    <Flex flexDirection="column">
      <Slider
        data={carousel.images as any}
        render={slide => {
          return (
            <Image
              px={5}
              src={slide.resized.url}
              width={slide.resized.width}
              height={slide.resized.height}
            />
          )
        }}
      />
      <Spacer my={2} />

      <Flex flexDirection="column" alignItems="center">
        <Serif size="5">{props.artist.name}</Serif>
        <Flex>
          <Box mx={1}>
            <Serif size="2">
              {props.artist.nationality && `${props.artist.nationality}, `}
              {props.artist.years}
            </Serif>
          </Box>
          <Serif size="2">
            {props.artist.counts.follows.toLocaleString()} followers
          </Serif>
        </Flex>
      </Flex>
      <Box my={2}>
        <Button variant="primaryBlack" size="medium" width="100%">
          Follow
        </Button>
      </Box>
    </Flex>
  )
}

export const ArtistHeaderFragmentContainer = createFragmentContainer(
  ArtistHeader,
  graphql`
    fragment ArtistHeader_artist on Artist {
      name
      nationality
      years
      counts {
        follows
      }
      carousel {
        images {
          resized(height: 300) {
            url
            width
            height
          }
        }
      }
    }
  `
)
