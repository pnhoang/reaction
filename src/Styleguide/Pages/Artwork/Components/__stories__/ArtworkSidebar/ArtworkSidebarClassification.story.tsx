import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ArtworkSidebarClassification as Classification } from "Styleguide/Pages/Artwork/Components/ArtworkSidebar/ArtworkSidebarClassification"
import {
  ArtworkWithClassification,
  ArtworkWithoutClassification,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/Classification"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module).add("Classification", () => {
  return (
    <React.Fragment>
      <Section title="Artwork with Classification">
        <Classification artwork={ArtworkWithClassification} />
      </Section>
      <Section title="Artwork without Classification">
        <Classification artwork={ArtworkWithoutClassification} />
      </Section>
    </React.Fragment>
  )
})
