import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ArtworkSidebarMetadata as Metadata } from "Styleguide/Pages/Artwork/Components/ArtworkSidebar/ArtworkSidebarMetadata"
import {
  EmptyMetadataMultipleEditionSets,
  EmptyMetadataNoEditions,
  EmptyMetadataOneEditionSet,
  FilledOutMetadataMultipleEditionSets,
  FilledOutMetadataNoEditions,
  FilledOutMetadataOneEditionSet,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/ArtworkMetadata"
import { Section } from "Styleguide/Utils/Section"
import { RelayStubProvider } from "Utils/RelayStubProvider"

storiesOf("Styleguide/Artwork/Sidebar", module)
  .addDecorator(story => <RelayStubProvider>{story()}</RelayStubProvider>)
  .add("Metadata", () => {
    return (
      <React.Fragment>
        <Section title="Filled out metadata no editions">
          <Metadata artwork={FilledOutMetadataNoEditions} />
        </Section>
        <Section title="Filled out metadata one edition set">
          <Metadata artwork={FilledOutMetadataOneEditionSet} />
        </Section>
        <Section title="Filled out metadata multiple edition sets">
          <Metadata artwork={FilledOutMetadataMultipleEditionSets} />
        </Section>
        <Section title="Empty metadata no editions">
          <Metadata artwork={EmptyMetadataNoEditions} />
        </Section>
        <Section title="Empty metadata one edition set">
          <Metadata artwork={EmptyMetadataOneEditionSet} />
        </Section>
        <Section title="Empty metadata multiple edition sets">
          <Metadata artwork={EmptyMetadataMultipleEditionSets} />
        </Section>
      </React.Fragment>
    )
  })
