export default {
  FETCH_FACTSHEETS: `query ($filter: FilterInput!) {
    allFactSheets(filter: $filter) {
      edges {
        node {
          id
          name
          level
        }
      }
    }
  }`,

}