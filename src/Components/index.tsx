// @ts-ignore - https://github.com/styled-components/styled-components/issues/1063#issuecomment-320344957
import React from "react"
// @ts-ignore
import Artwork, { ArtworkProps } from "./Artwork"
// @ts-ignore
import ArtworkGrid, { ArtworkGridContainerProps } from "./ArtworkGrid"
// @ts-ignore
import BorderedPulldown, { BorderedPullDownProps } from "./BorderedPulldown"
import Buttons from "./Buttons"
import Checkbox from "./Checkbox"
// @ts-ignore
import Icon, { IconProps } from "./Icon"
// @ts-ignore
import Input, { InputProps } from "./Input"
import Modal from "./Modal/Modal"
// @ts-ignore
import Nav, { NavBarProps } from "./Nav"
// @ts-ignore
import Text, { TextProps } from "./Text"
import TextArea from "./TextArea"
// @ts-ignore
import TextLink, { LinkProps } from "./TextLink"
// @ts-ignore
import Title, { TitleProps } from "./Title"

export interface InitOptions {
  user: User
  component: any
  domID: string
  queryConfig: any
}

// TODO: Fix Force integration post Relay Modern migration
export function init(options: InitOptions) {
  // Relay.injectNetworkLayer(artsyNetworkLayer(options.user))
  // const rootRoute = (
  //   <Artsy.ContextProvider currentUser={options.user}>
  //     <Relay.RootContainer Component={options.component} route={options.queryConfig} />
  //   </Artsy.ContextProvider>
  // )
  // ReactDOM.render(rootRoute, document.getElementById(options.domID))
}

export default {
  Artwork,
  Buttons,
  Modal,
  ArtworkGrid,
  BorderedPulldown,
  Checkbox,
  Icon,
  Input,
  Nav,
  Text,
  TextArea,
  TextLink,
  Title,
}
