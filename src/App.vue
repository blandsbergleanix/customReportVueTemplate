<template>
  <div class="report-container">
    <div>
      <button v-on:click="view = 'view1'">Details </button>
      <button v-on:click="view = 'view2'">General</button>
    </div>
    <first-view v-if="view === 'view1'" :factsheets="factsheets" />
    <second-view v-else :factsheets="factsheets"/>
  </div>
</template>

<script>
import '@leanix/reporting'
import FirstView from './components/FirstView'
import SecondView from './components/SecondView'
import graphql from './graphql'

export default {
  components: { FirstView, SecondView },
  data () {
    return {
      view: 'view1',
      factsheets: []
    }
  },
  methods: {
    fetchAllFactsheets () {
      const query = graphql.queries.FETCH_FACTSHEETS
      const variables = {
        filter: {
          facetFilters: [
            { facetKey: 'FactSheetTypes', keys: ['Application'] },
            { facetKey: 'hierarchyLevel', keys: ['1'] },
            {
              "facetKey":"lifecycle",
              "operator":"OR",
              "keys":["plan","phaseIn","active","phaseOut"],
              "dateFilter":{
                "from":"2018-01-17",
                "to":"2018-01-17",
                "type":"TODAY",
                "minDate":"2013-06-01",
                "maxDate":"2022-12-31"
              }
            }
          ]
        }
      }
      lx.executeGraphQL(query, variables)
        .then(res => {
          if (res.allFactSheets) {
            this.factsheets = res.allFactSheets.edges.map(edge => edge.node)
            this.sumApps = 0
            this.sumApps30 = 0
            this.sumApps90 = 0
            this.sumItcs = 0
            this.sumItcs30 = 0
            this.sumItcs90 = 0
            this.sumDataObjs = 0
            this.sumDataObjs30 = 0
            this.sumDataObjs90 = 0
            this.sumBusCaps = 0
            this.sumBusCaps30 = 0
            this.sumBusCaps90 = 0
            this.sumProjects = 0
            this.sumProjects30 = 0
            this.sumProjects90 = 0
            this.sumProvider = 0
            this.sumProvider30 = 0
            this.sumProvider90 = 0
            this.sumProcesses = 0
            this.sumProcesses30 = 0
            this.sumProcesses90 = 0
            this.sumInterfaces = 0
            this.sumInterfaces30 = 0
            this.sumInterfaces90 = 0
            this.sumOther = 0
            this.sumOther30 = 0
            this.sumOther90 = 0
            this.sumUniqueUser = 0
            this.factsheets.forEach(factSheet => {
              this.sumApps = this.sumApps + factSheet.numberOfApplications
              this.sumApps30 = this.sumApps30 + factSheet.numberOfApplicationsMinus30
              this.sumApps90 = this.sumApps90 + factSheet.numberOfApplicationsMinus90
              this.sumItcs = this.sumItcs + factSheet.numberOfITComponents
              this.sumItcs30 = this.sumItcs30 + factSheet.numberOfITComponentsMinus30
              this.sumItcs90 = this.sumItcs90 + factSheet.numberOfITComponentsMinus90
              this.sumDataObjs = this.sumDataObjs + factSheet.numberOfDataObjects
              this.sumDataObjs30 = this.sumDataObjs30 + factSheet.numberOfDataObjectsMinus30
              this.sumDataObjs90 = this.sumDataObjs90 + factSheet.numberOfDataObjectsMinus90
              this.sumBusCaps = this.sumBusCaps + factSheet.numberOfBusinessCapabilities
              this.sumBusCaps30 = this.sumBusCaps30 + factSheet.numberOfBusinessCapabilitiesMinus30
              this.sumBusCaps90 = this.sumBusCaps90 + factSheet.numberOfBusinessCapabilitiesMinus90
              this.sumProjects = this.sumProjects + factSheet.numberOfProjects
              this.sumProjects30 = this.sumProjects30 + factSheet.numberOfProjectsMinus30
              this.sumProjects90 = this.sumProjects90 + factSheet.numberOfProjectsMinus90
              this.sumProvider = this.sumBusProvider + factSheet.numberOfProviders
              this.sumProvider30 = this.sumBusProvider30 + factSheet.numberOfProvidersMinus30
              this.sumProvider90 = this.sumBusProvider90 + factSheet.numberOfProvidersMinus90
              this.sumProcesses = this.sumProcesses + factSheet.numberOfProcesses
              this.sumProcesses30 = this.sumProcesses30 + factSheet.numberOfProcessesMinus30
              this.sumProcesses90 = this.sumProcesses90 + factSheet.numberOfProcessesMinus90
              this.sumInterfaces = this.sumInterfaces + factSheet.numberOfInterfaces
              this.sumInterfaces30 = this.sumInterfaces30 + factSheet.numberOfInterfacesMinus30
              this.sumInterfaces90 = this.sumInterfaces90 + factSheet.numberOfInterfacesMinus90
              this.sumOther = this.sumOther + factSheet.numberOfOtherFactSheets
              this.sumOther30 = this.sumOther30 + factSheet.numberOfOtherFactSheetsMinus30
              this.sumOther90 = this.sumOther90 + factSheet.numberOfOtherFactSheetsMinus90
              this.sumUniqueUser = this.sumUniqueUser + factSheet.numberOfUniqueUsersLast30Days
            });
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted () {
    lx.init()
      .then(setup => {
        this.setup = setup
        lx.ready({
          facets: [
            {
              fixedFactSheetType: 'Application',
              attributes: [
               'id',
               'name', 
               'numberOfApplications',
               'numberOfApplicationsMinus30',
               'numberOfApplicationsMinus90',
               'numberOfDataObjects',
               'numberOfDataObjectsMinus30',
               'numberOfDataObjectsMinus90',
               'numberOfITComponents',
               'numberOfITComponentsMinus30',
               'numberOfITComponentsMinus90',
               'numberOfBusinessCapabilities',
               'numberOfBusinessCapabilitiesMinus30',
               'numberOfBusinessCapabilitiesMinus90',
               'numberOfProjects',
               'numberOfProjectsMinus30',
               'numberOfProjectsMinus90',
               'numberOfProviders',
               'numberOfProvidersMinus30',
               'numberOfProvidersMinus90',
               'numberOfProcesses',
               'numberOfProcessesMinus30',
               'numberOfProcessesMinus90',
               'numberOfInterfaces',
               'numberOfInterfacesMinus30',
               'numberOfInterfacesMinus90',
               'numberOfOtherFactSheets',
               'numberOfDataObjectsMinus30',
               'numberOfDataObjectsMinus90',
               'numberOfUniqueUsersLast30Days'
               ],
              callback: (filteredFactSheets) => {
                console.log(filteredFactSheets);
                // avg = calc(filteredFactSheets)
                // this.factsheets = filteredFactSheets.filter(fs => fs.??? > avg)
                this.factsheets = filteredFactSheets;
              }
            }
          ]
        })
        this.fetchAllFactsheets()
      })
  }
}
</script>

<style lang="stylus" scoped>
  .report-container
    background white 
    color black
    padding 16px
    width 1000px
    overflow-wrap: normal;
  
  .item
    background white
    color black
    margin 8px
    padding 8px

</style>
