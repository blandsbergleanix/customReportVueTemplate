export default {
  FETCH_FACTSHEETS: `query ($filter: FilterInput!) {
    allFactSheets(filter: $filter) {
      edges {
        node {
          name
          ... on Application {
            numberOfApplications
            numberOfApplicationsMinus30
            numberOfApplicationsMinus90
            numberOfDataObjects
            numberOfDataObjectsMinus30
            numberOfDataObjectsMinus90
            numberOfITComponents
            numberOfITComponentsMinus30
            numberOfITComponentsMinus90
            numberOfBusinessCapabilities
            numberOfBusinessCapabilitiesMinus30
            numberOfBusinessCapabilitiesMinus90
            numberOfProjects
            numberOfProjectsMinus30
            numberOfProjectsMinus90
            numberOfProviders
            numberOfProvidersMinus30
            numberOfProvidersMinus90
            numberOfProcesses
            numberOfProcessesMinus30
            numberOfProcessesMinus90
            numberOfInterfaces
            numberOfInterfacesMinus30
            numberOfInterfacesMinus90
            numberOfOtherFactSheets
            numberOfDataObjectsMinus30
            numberOfDataObjectsMinus90
            numberOfUniqueUsersLast30Days
        }
        }
      }
    }
  }`,
  
}