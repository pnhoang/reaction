import { ArticlesRefetchContainer_artist } from "__generated__/ArticlesRefetchContainer_artist.graphql"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import styled from "styled-components"
import { PaginationFragmentContainer as Pagination } from "Styleguide/Components/Pagination"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { ArticleItem } from "./ArticleItem"

const PAGE_SIZE = 10

interface ArticlesProps {
  relay: RelayRefetchProp
  artist: ArticlesRefetchContainer_artist
}

export const ArticlesRefetchContainer = createRefetchContainer(
  class extends React.Component<ArticlesProps> {
    loadNext = () => {
      const {
        hasNextPage,
        endCursor,
      } = this.props.artist.articlesConnection.pageInfo
      if (hasNextPage) {
        this.loadAfter(endCursor)
      }
    }

    loadAfter = cursor => {
      this.props.relay.refetch(
        {
          first: PAGE_SIZE,
          after: cursor,
          artistID: this.props.artist.id,
          before: null,
          last: null,
        },
        null,
        error => {
          if (error) {
            console.error(error)
          }
        }
      )
    }

    render() {
      return (
        <React.Fragment>
          <span id="jumpto--artistArticles" />
          <Row>
            <Col>
              <ArticleList>
                {this.props.artist.articlesConnection.edges.map(({ node }) => {
                  return (
                    <ArticleItem
                      title={node.thumbnail_title}
                      imageUrl={node.thumbnail_image.resized.url}
                      date={node.published_at}
                      author={node.author.name}
                      href={node.href}
                    />
                  )
                })}
              </ArticleList>
            </Col>
          </Row>

          <Row>
            <Col>
              <Flex mb={2} justifyContent="flex-end">
                <Pagination
                  pageCursors={
                    this.props.artist.articlesConnection.pageCursors as any
                  }
                  onClick={this.loadAfter}
                  onNext={this.loadNext}
                  scrollTo="#jumpto-RouteTabs"
                />
              </Flex>
            </Col>
          </Row>
        </React.Fragment>
      )
    }
  },
  {
    artist: graphql`
      fragment ArticlesRefetchContainer_artist on Artist
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        id
        articlesConnection(
          first: $first
          after: $after
          before: $before
          last: $last
          sort: PUBLISHED_AT_DESC
          in_editorial_feed: true
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              href
              thumbnail_title
              author {
                name
              }
              published_at(format: "MMM d, YYYY")
              thumbnail_image {
                resized(width: 300) {
                  url
                }
              }
              href
            }
          }
        }
      }
    `,
  },
  graphql`
    query ArticlesRefetchContainerQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $artistID: String!
    ) {
      artist(id: $artistID) {
        ...ArticlesRefetchContainer_artist
          @arguments(first: $first, last: $last, after: $after, before: $before)
      }
    }
  `
)

const ArticleList = styled.div``
